USE employee_db;

SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", r.title, r.salary FROM employee e
 JOIN role r ON r.id;

SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", r.title, d.departmentName AS "Department", r.salary AS "Salary" FROM employee e
INNER JOIN role r ON r.id = e.roleId INNER JOIN department d ON d.id = r.departmentId;

-- All Employees query
SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.departmentName, "No Data") AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.firstName," ",m.lastName) AS "Manager"
FROM employee e
LEFT JOIN role r 
ON r.id = e.roleId 
LEFT JOIN department d 
ON d.id = r.departmentId
LEFT JOIN employee m ON m.id = e.managerId
ORDER BY e.id;

-- Empoyees by department query
SELECT e.firstName AS "First Name", e.lastName AS "Last Name", r.title, d.departmentName AS "Department" FROM employee e
INNER JOIN role r ON r.id = e.roleId INNER JOIN department d ON d.id = r.departmentId WHERE departmentName = 'Management';

SELECT CONCAT(e.firstName," " ,e.lastName) AS fullName, r.title, e.managerId FROM employee e
INNER JOIN role r ON r.id = e.roleId WHERE e.managerId = 1; 


SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;

DELETE FROM employee where id = 11;

SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", r.title, d.departmentName AS "Department", r.salary 
FROM employees e 
INNER JOIN role r ON r.id = e.roleId INNER JOIN department d ON d.id = r.departmentId 
WHERE departmentName = 'Sales';
            
-- ON DELETE CASCADE

-- Add Employee with first_name, last_name, role_id


INSERT INTO employee(firstName, lastName, role_id, manager_id) 
VALUES('Tim', 'Jone', (SELECT id FROM role WHERE title = 'Sales Rep' ), 
(SELECT id FROM (SELECT id FROM employee WHERE CONCAT(firstName," ",lastName) = "Michael Scott" )AS tmptable));
           
SELECT Errors;