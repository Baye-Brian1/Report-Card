export async function getJson(path) {
  const res = await fetch(path);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return await res.json();
}

export async function postJson(path, data) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return await res.json();
}

export function getStudents() {
  return getJson("/api/students");
}

export function addStudent(student) {
  return postJson("/api/students", student);
}

export function getClasses() {
  return getJson("/api/classes");
}

export function addClass(name) {
  return postJson("/api/classes", { name });
}

export function getRoster(className) {
  return getJson(`/api/roster?class=${encodeURIComponent(className)}`);
}

export function getMarks(cls, subject, sequence) {
  return getJson(`/api/marks?class=${encodeURIComponent(cls)}&subject=${encodeURIComponent(subject)}&sequence=${encodeURIComponent(sequence)}`);
}

export function saveMarks(cls, subject, sequence, marks) {
  return postJson("/api/marks", { class: cls, subject, sequence, marks });
}
