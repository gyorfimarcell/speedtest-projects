# Employee Directory (15 mins)

Create an employee directory using the provided HTML and CSS files. You may modify the template, but it is not necessary for completing the task.

## Employees

Employee data is provided in a JSON file. Fetch the data and display all employees when the page loads.

Each employee should display the following information:

- Profile picture
- Full name
- Title
- Department
- Employment type (Full-time, Part-time, or Contract)
- Email address
- Phone number

Employees should always be sorted alphabetically by their name.

## Filtering

The page contains the following filter controls:

- A search input field
- A department selector
- An employment type selector

Implement filtering with the following behavior:

1. The search field filters employees by name, title, or email address. The search should be case-insensitive and should match partial names.
2. The department selector filters employees by department. The available departments should also be loaded from the JSON file, and displayed alphabetically.
   Each department should appear in the list only once.
3. The employment type selector filters employees by employment type.
4. All filters should work together. An employee should only be displayed if it matches every active filter.
5. Filtering should happen immediately whenever the user changes a filter value.

Please see the provided HTML, CSS, and JSON files in the assets directory.
