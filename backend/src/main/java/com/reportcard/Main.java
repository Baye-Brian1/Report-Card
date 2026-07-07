package com.reportcard;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Main {
    private static final File DATA_FILE = new File("backend-data.ser");

    public static void main(String[] args) throws IOException {
        DataStore.load(DATA_FILE);

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/health", exchange -> {
            String json = "{\"status\":\"UP\",\"service\":\"report-card-backend\",\"message\":\"Backend is running\"}";
            sendJson(exchange, 200, json);
        });

        server.createContext("/api/students", new StudentsHandler());
        server.createContext("/api/classes", new ClassesHandler());
        server.createContext("/api/roster", new RosterHandler());
        server.createContext("/api/marks", new MarksHandler());
        server.createContext("/api/activities", new ActivitiesHandler());

        server.setExecutor(null);
        server.start();

        System.out.println("Report Card backend running on http://localhost:8080");
    }

    private static void sendJson(HttpExchange exchange, int code, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static Map<String, String> parseJsonObject(String s) {
        Map<String, String> map = new HashMap<>();
        if (s == null)
            return map;
        s = s.trim();
        if (s.startsWith("{"))
            s = s.substring(1);
        if (s.endsWith("}"))
            s = s.substring(0, s.length() - 1);
        boolean inQuotes = false;
        StringBuilder cur = new StringBuilder();
        List<String> parts = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '"')
                inQuotes = !inQuotes;
            if (c == ',' && !inQuotes) {
                parts.add(cur.toString());
                cur.setLength(0);
            } else {
                cur.append(c);
            }
        }
        if (cur.length() > 0)
            parts.add(cur.toString());
        for (String p : parts) {
            int idx = p.indexOf(':');
            if (idx < 0)
                continue;
            String k = p.substring(0, idx).trim();
            String v = p.substring(idx + 1).trim();
            k = stripQuotes(k);
            v = stripQuotes(v);
            map.put(k, v);
        }
        return map;
    }

    private static String stripQuotes(String s) {
        s = s.trim();
        if (s.startsWith("\"") && s.endsWith("\""))
            return s.substring(1, s.length() - 1);
        return s;
    }

    // Handlers
    static class StudentsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            if ("GET".equalsIgnoreCase(method)) {
                List<Student> list = DataStore.getStudents();
                StringBuilder sb = new StringBuilder();
                sb.append('[');
                for (int i = 0; i < list.size(); i++) {
                    if (i > 0)
                        sb.append(',');
                    sb.append(list.get(i).toJson());
                }
                sb.append(']');
                sendJson(exchange, 200, sb.toString());
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> obj = parseJsonObject(body);
                Student s = DataStore.addStudent(
                        obj.getOrDefault("name", ""),
                        obj.getOrDefault("class", obj.getOrDefault("className", "Form 1")),
                        obj.getOrDefault("gender", "Male"),
                        obj.getOrDefault("guardian", "—"),
                        obj.getOrDefault("phone", "—"),
                        obj.getOrDefault("dob", "—"));
                DataStore.save(DATA_FILE);
                sendJson(exchange, 201, s.toJson());
                return;
            }
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class ClassesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<ClassInfo> classes = DataStore.getClasses();
                StringBuilder sb = new StringBuilder();
                sb.append('[');
                for (int i = 0; i < classes.size(); i++) {
                    if (i > 0)
                        sb.append(',');
                    sb.append(classes.get(i).toJson());
                }
                sb.append(']');
                sendJson(exchange, 200, sb.toString());
                return;
            }
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> obj = parseJsonObject(body);
                String name = obj.getOrDefault("name", "New Class");
                ClassInfo c = DataStore.addClass(name);
                DataStore.save(DATA_FILE);
                sendJson(exchange, 201, c.toJson());
                return;
            }
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class RosterHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
                return;
            }
            String query = exchange.getRequestURI().getQuery();
            String className = "";
            if (query != null) {
                for (String q : query.split("&")) {
                    int idx = q.indexOf('=');
                    if (idx > 0) {
                        String k = q.substring(0, idx);
                        String v = q.substring(idx + 1).replace("+", " ");
                        if ("class".equalsIgnoreCase(k))
                            className = java.net.URLDecoder.decode(v, StandardCharsets.UTF_8);
                    }
                }
            }
            List<Student> roster = DataStore.getStudentsByClass(className);
            StringBuilder sb = new StringBuilder();
            sb.append('[');
            for (int i = 0; i < roster.size(); i++) {
                if (i > 0)
                    sb.append(',');
                sb.append(roster.get(i).toJson());
            }
            sb.append(']');
            sendJson(exchange, 200, sb.toString());
        }
    }

    static class MarksHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            if ("GET".equalsIgnoreCase(method)) {
                String query = exchange.getRequestURI().getQuery();
                Map<String, String> qmap = new HashMap<>();
                if (query != null)
                    for (String q : query.split("&")) {
                        int idx = q.indexOf('=');
                        if (idx > 0)
                            qmap.put(q.substring(0, idx),
                                    java.net.URLDecoder.decode(q.substring(idx + 1), StandardCharsets.UTF_8));
                    }
                String cls = qmap.getOrDefault("class", "");
                String subject = qmap.getOrDefault("subject", "");
                String sequence = qmap.getOrDefault("sequence", "");
                Map<String, Double> marks = DataStore.getMarks(cls, subject, sequence);
                StringBuilder sb = new StringBuilder();
                sb.append('{');
                boolean first = true;
                for (Map.Entry<String, Double> e : marks.entrySet()) {
                    if (!first)
                        sb.append(',');
                    first = false;
                    sb.append('"').append(e.getKey()).append('"').append(':').append(e.getValue());
                }
                sb.append('}');
                sendJson(exchange, 200, sb.toString());
                return;
            }
            if ("POST".equalsIgnoreCase(method)) {
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> obj = parseJsonObject(body);
                String cls = obj.getOrDefault("class", "");
                String subject = obj.getOrDefault("subject", "");
                String sequence = obj.getOrDefault("sequence", "");
                // naive parse marks object inside body (look for \"marks\":{...})
                int midx = body.indexOf("\"marks\"");
                Map<String, Double> marks = new HashMap<>();
                if (midx >= 0) {
                    int colon = body.indexOf(':', midx);
                    int start = body.indexOf('{', colon);
                    int end = body.indexOf('}', start);
                    if (start > 0 && end > start) {
                        String inner = body.substring(start + 1, end);
                        for (String p : inner.split(",")) {
                            int idx = p.indexOf(':');
                            if (idx > 0) {
                                String k = stripQuotes(p.substring(0, idx).trim());
                                String v = p.substring(idx + 1).trim();
                                try {
                                    marks.put(k, Double.parseDouble(v));
                                } catch (Exception ex) {
                                }
                            }
                        }
                    }
                }
                DataStore.saveMarks(cls, subject, sequence, marks);
                DataStore.save(DATA_FILE);
                sendJson(exchange, 200, "{\"status\":\"ok\"}");
                return;
            }
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    static class ActivitiesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            if ("GET".equalsIgnoreCase(method)) {
                List<ActivityEntry> list = DataStore.getActivities();
                StringBuilder sb = new StringBuilder();
                sb.append('[');
                for (int i = 0; i < list.size(); i++) {
                    if (i > 0)
                        sb.append(',');
                    sb.append(list.get(i).toJson());
                }
                sb.append(']');
                sendJson(exchange, 200, sb.toString());
                return;
            }
            if ("POST".equalsIgnoreCase(method)) {
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                Map<String, String> obj = parseJsonObject(body);
                String type = obj.getOrDefault("type", "Report Card");
                String text = obj.getOrDefault("text", "Report card generated");
                DataStore.logActivity(type, text);
                DataStore.save(DATA_FILE);
                sendJson(exchange, 201, "{\"status\":\"ok\"}");
                return;
            }
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
        }
    }

    // Data classes & store
    static class Student implements Serializable {
        private static final long serialVersionUID = 1L;
        String id, name, className, gender, guardian, phone, dob, status;

        Student(String id, String name, String className, String gender, String guardian, String phone, String dob) {
            this.id = id;
            this.name = name;
            this.className = className;
            this.gender = gender;
            this.guardian = guardian;
            this.phone = phone;
            this.dob = dob;
            this.status = "Active";
        }

        String toJson() {
            return String.format(Locale.ROOT,
                    "{\"id\":\"%s\",\"name\":\"%s\",\"class\":\"%s\",\"gender\":\"%s\",\"guardian\":\"%s\",\"phone\":\"%s\",\"dob\":\"%s\",\"status\":\"%s\"}",
                    escape(id), escape(name), escape(className), escape(gender), escape(guardian), escape(phone),
                    escape(dob), escape(status));
        }

        private String escape(String s) {
            return s == null ? "" : s.replace("\\", "\\\\").replace("\"", "\\\"");
        }
    }

    static class ClassInfo implements Serializable {
        private static final long serialVersionUID = 1L;
        String name;
        String teacher;
        Double average;
        int students;

        ClassInfo(String name) {
            this.name = name;
            this.teacher = "Unassigned";
            this.average = null;
            this.students = 0;
        }

        String toJson() {
            return String.format(Locale.ROOT, "{\"name\":\"%s\",\"students\":%d,\"average\":%s,\"teacher\":\"%s\"}",
                    escape(name), students, average == null ? "null" : String.format(Locale.ROOT, "%.2f", average),
                    escape(teacher));
        }

        private String escape(String s) {
            return s == null ? "" : s.replace("\\", "\\\\").replace("\"", "\\\"");
        }
    }

    static class ActivityEntry implements Serializable {
        private static final long serialVersionUID = 1L;
        String type;
        String text;
        long timestamp;

        ActivityEntry(String type, String text, long timestamp) {
            this.type = type;
            this.text = text;
            this.timestamp = timestamp;
        }

        String toJson() {
            return String.format(Locale.ROOT, "{\"type\":\"%s\",\"text\":\"%s\",\"timestamp\":%d}", escape(type),
                    escape(text), timestamp);
        }

        private String escape(String s) {
            return s == null ? "" : s.replace("\\", "\\\\").replace("\"", "\\\"");
        }
    }

    static class DataStore {
        private static final List<Student> students = new ArrayList<>();
        private static final List<ClassInfo> classes = new ArrayList<>();
        private static final List<ActivityEntry> activities = new ArrayList<>();
        // marks: class -> subject -> sequence -> studentId -> mark
        private static final Map<String, Map<String, Map<String, Map<String, Double>>>> marks = new HashMap<>();

        static synchronized void load(File f) {
            if (!f.exists()) {
                // seed default classes
                for (String n : Arrays.asList("Form 1", "Form 2", "Form 3", "Form 4", "Form 5"))
                    classes.add(new ClassInfo(n));
                return;
            }
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(f))) {
                Object obj = ois.readObject();
                if (obj instanceof Map) {
                    Map<?, ?> m = (Map<?, ?>) obj;
                    Object s = m.get("students");
                    Object c = m.get("classes");
                    Object mk = m.get("marks");
                    Object ac = m.get("activities");
                    students.clear();
                    classes.clear();
                    marks.clear();
                    activities.clear();
                    if (s instanceof List)
                        students.addAll((List<Student>) s);
                    if (c instanceof List)
                        classes.addAll((List<ClassInfo>) c);
                    if (mk instanceof Map)
                        marks.putAll((Map) mk);
                    if (ac instanceof List)
                        activities.addAll((List<ActivityEntry>) ac);
                }
            } catch (Exception ex) {
                System.err.println("Failed to load datastore: " + ex.getMessage());
            }
        }

        static synchronized void save(File f) {
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(f))) {
                Map<String, Object> m = new HashMap<>();
                m.put("students", new ArrayList<>(students));
                m.put("classes", new ArrayList<>(classes));
                m.put("marks", new HashMap<>(marks));
                m.put("activities", new ArrayList<>(activities));
                oos.writeObject(m);
            } catch (Exception ex) {
                System.err.println("Failed to save datastore: " + ex.getMessage());
            }
        }

        static synchronized void logActivity(String type, String text) {
            activities.add(0, new ActivityEntry(type, text, System.currentTimeMillis()));
            // keep the log from growing forever
            while (activities.size() > 200) {
                activities.remove(activities.size() - 1);
            }
        }

        static synchronized List<ActivityEntry> getActivities() {
            return new ArrayList<>(activities);
        }

        static synchronized Student addStudent(String name, String className, String gender, String guardian,
                String phone, String dob) {
            String id = String.format("SPX-%04d", students.size() + 1);
            Student s = new Student(id, name, className, gender, guardian, phone, dob);
            students.add(s);
            // ensure class exists
            boolean found = false;
            for (ClassInfo c : classes)
                if (c.name.equals(className)) {
                    c.students++;
                    found = true;
                    break;
                }
            if (!found)
                classes.add(new ClassInfo(className));
            logActivity("Student", "New student enrolled — " + name + " (" + className + ")");
            return s;
        }

        static synchronized List<Student> getStudents() {
            return new ArrayList<>(students);
        }

        static synchronized List<Student> getStudentsByClass(String className) {
            if (className == null || className.isEmpty())
                return new ArrayList<>(students);
            List<Student> out = new ArrayList<>();
            for (Student s : students)
                if (className.equals(s.className))
                    out.add(s);
            return out;
        }

        static synchronized List<ClassInfo> getClasses() {
            return new ArrayList<>(classes);
        }

        static synchronized ClassInfo addClass(String name) {
            ClassInfo c = new ClassInfo(name);
            classes.add(c);
            logActivity("Class", "New class added — " + name);
            return c;
        }

        static synchronized void saveMarks(String cls, String subject, String sequence, Map<String, Double> m) {
            Map<String, Double> existing = marks
                    .computeIfAbsent(cls, k -> new HashMap<>())
                    .computeIfAbsent(subject, k -> new HashMap<>())
                    .computeIfAbsent(sequence, k -> new HashMap<>());
            existing.putAll(m);
            logActivity("Marks", "Marks entered — " + cls + ", " + subject + ", " + sequence);
        }

        static synchronized Map<String, Double> getMarks(String cls, String subject, String sequence) {
            return marks.getOrDefault(cls, Collections.emptyMap()).getOrDefault(subject, Collections.emptyMap())
                    .getOrDefault(sequence, Collections.emptyMap());
        }
    }
}