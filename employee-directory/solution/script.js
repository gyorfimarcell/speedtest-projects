// Constants
const TYPE_LABELS = {
  "full-time": "Full-Time",
  "part-time": "Part-Time",
  contract: "Contract",
};

// HTML elements
const grid = document.getElementById("employee-grid");
const search = document.getElementById("search");
const departmentSelect = document.getElementById("department");
const typeSelect = document.getElementById("type");

let employees = [];
let employeeCards = [];

function init() {
  getData();

  search.addEventListener("input", filter);
  departmentSelect.addEventListener("change", filter);
  typeSelect.addEventListener("change", filter);
}

async function getData() {
  grid.innerHTML = "";

  // Fetch employee data
  const res = await fetch("employees.json");
  const json = await res.json();
  employees = json.sort((a, b) => a.name.localeCompare(b.name));

  // Fill employee grid
  for (const employee of employees) {
    grid.innerHTML += `
        <div class="employee-card">
          <div class="employee-header">
            <img src="avatars/${employee.profileImage}" alt="Employee" />
            <div>
              <div class="employee-name">${employee.name}</div>
              <div class="employee-title">${employee.title}</div>
            </div>
          </div>

          <div class="employee-details">
            <div>
              <span class="label">Department:</span>
              <span class="employee-department">${employee.department}</span>
            </div>
            <div>
              <span class="label">Type:</span>
              <span class="employee-type">${TYPE_LABELS[employee.employmentType]}</span>
            </div>
            <div>
              <span class="label">Email:</span>
              <a href="mailto:${employee.email}" class="employee-email"
                >${employee.email}</a
              >
            </div>
            <div>
              <span class="label">Phone:</span>
              <a href="tel:${employee.phone}" class="employee-phone">${employee.phone}</a>
            </div>
          </div>
        </div>
    `;
  }

  // Fill department selector
  const departments = [...new Set(employees.map((x) => x.department))].sort(
    (a, b) => a.localeCompare(b),
  );
  for (const department of departments) {
    const opt = document.createElement("option");
    opt.value = department;
    opt.innerText = department;
    departmentSelect.appendChild(opt);
  }

  employeeCards = document.querySelectorAll(".employee-card");
}

async function filter() {
  for (let i = 0; i < employees.length; i++) {
    // Match search field
    const query = search.value.trim().toLocaleLowerCase();
    const matchesSearch =
      search.value === "" ||
      employees[i].name.toLocaleLowerCase().includes(query) ||
      employees[i].title.toLocaleLowerCase().includes(query) ||
      employees[i].email.toLocaleLowerCase().includes(query);

    // Match selects
    const matchesDepartment =
      departmentSelect.value === "" ||
      employees[i].department === departmentSelect.value;

    const matchesType =
      typeSelect.value === "" ||
      employees[i].employmentType === typeSelect.value;

    // Hide/show employee cards
    const visible = matchesSearch && matchesDepartment && matchesType;
    employeeCards[i].style.display = visible ? "" : "none";
  }
}

init();
