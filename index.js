const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const table = require('console.table');
const connection = require('./connections')




const userOptions = () => {
    inquirer.prompt({
        name: 'Options',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all Employees', 
            'View all Employees by Department',
            'View all Employees by Manager', 
            'Add Employee', 
            'Remove Employee', 
            'Update Employee Role', 
            'View all Roles', 
            'Add Role', 
            'Remove Role', 
            'View all Departments', 
            'Add Department', 
            'Remove Department', 
            'Exit'
        ],

    }).then((answer) => {
        switch (answer.Options) {
            case 'View all Employees':
                viewAll();
                break;
            case 'View all Employees by Department':
                viewDepartmentEmpolyee();
                break;
            case 'View all Employees by Manager':
                viewManagedEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View all Roles':
                allRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'View all Departments':
                allDepartments();
                break;
            case 'Add Department':
                addDepartments();
                break;
            case 'Remove Department':
                removeDepartments();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}



const viewAll = () => {
    const allEmp = `SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.name, "No Data") AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.firstName," ",m.lastName) AS "Manager" FROM employee e LEFT JOIN role r ON r.id = e.roleId LEFT JOIN department d ON d.id = r.departmentId LEFT JOIN employee m ON m.id = e.managerId ORDER BY e.id`;
    connection.query(allEmp, (err, results) => {
        if (err) throw err;
        console.log (err);
        console.table(chalk.yellow('All the employees you requested'),results)
        userOptions();
    })

}

const viewDepartmentEmpolyee = () => {
    const empDepartment = 'SELECT * FROM department';
    connection.query(empDepartment, (err, results) => {
        if (err) throw err;
        console.log(err);

        inquirer.prompt([
            {
                name: 'departmentOptions',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.name)
                    return choiceArray;
                },
                message: 'Which department would you like to look at?'
            }
        ]).then((answer) => {
            let choices;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.departmentOptions) {
                    choices = results[i];
                }
            }

            const empDepartment2 = 'SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", r.title AS "Title", d.name AS "Department", r.salary AS "Salary" FROM employee e INNER JOIN role r ON r.id = e.roleId INNER JOIN department d ON d.id = r.departmentId WHERE ?;';
            connection.query(empDepartment2, { name: choices.name }, (err, res) => {
                if (err) throw err;
                console.log(err);
                console.table(chalk.yellow(`Here are the employees requested: ${choices.name}`), res)
                userOptions();
            })
        })
    })
}

const viewManagedEmployees = () => {
    const ManagedEmp = 'SELECT CONCAT (e.firstName," ",e.lastName) AS fullName, r.title, d.name FROM employee e INNER JOIN role r ON r.id = e.roleId INNER JOIN department d ON d.id = r.departmentId WHERE name = "Managers"';
    connection.query(ManagedEmp, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'ManagedEmpOptions',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.fullName);
                    return choiceArray;
                },
                message: 'Which manager would you like to view?'
            }
        ]).then((answer) => {
            const ManagedEmp2 = `SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.name, "No Data") AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.firstName," ",m.lastName) AS "Manager" FROM employee e LEFT JOIN role r ON r.id = e.roleId LEFT JOIN department d ON d.id = r.departmentId LEFT JOIN employee m ON m.id = e.managerId WHERE CONCAT(m.firstName," ",m.lastName) = ? ORDER BY e.id`;
            connection.query(ManagedEmp2, [answer.ManagedEmpOptions], (err, results) => {
                if (err) throw err;
                console.log(err);
                console.table(chalk.yellow('Here are the employees of the manager selected'), results);
                userOptions();
            })
        })
    })
}

const addEmployee = () => {
    const addEmp = 'SELECT * FROM role; SELECT CONCAT (e.firstName," ",e.lastName) AS fullName FROM employee e'
    connection.query(addEmp, (err, results) => {
        if (err) throw err;
        console.log(err);

        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "Please provide your first name"

            },
            {
                name: 'lastName',
                type: 'input',
                message: "Please provide your last name"
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.title);
                    return choiceArray;
                },
                message: 'What is your desired role?'

            },
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.fullName);
                    return choiceArray;
                },
                message: 'Who is your desired manager?'

            }
        ]).then((answer) => {
            connection.query( `INSERT INTO employee(firstName, lastName, roleId, managerId) VALUES(?, ?, (SELECT id FROM role WHERE title = ? ), (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(firstName," ",lastName) = ? ) AS tmptable))`, [answer.firstName, answer.lastName, answer.role, answer.manager])
            userOptions();
        })
    })


}

const removeEmployee = () => {
    const allEmp = 'SELECT e.id, e.firstName AS "First Name", e.lastName AS "Last Name", r.title, d.name AS "Department", IFNULL(r.salary, "No Data") AS "Salary", CONCAT(m.firstName," ",m.lastName) AS "Manager" FROM employee e LEFT JOIN role r ON r.id = e.roleId LEFT JOIN department d ON d.id = r.departmentId LEFT JOIN employee m ON m.id = e.managerId ORDER BY e.id';
    connection.query(allEmp, (err, results) => {
        if (err) throw err;
        console.log(err);
        console.table(chalk.yellow('All Employees'), results)
        inquirer.prompt([
            {
                name: 'removeEmployee',
                type: 'input',
                message: 'Enter the ID of the employee you wish to remove'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM employee where ?`, { id: answer.removeEmployee })
            userOptions();
        })
    })
}

const updateRole = () => {
    const updatedRole = 'SELECT CONCAT (firstName," ",lastName) AS fullName FROM employee; SELECT title FROM role';
    connection.query(updatedRole, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.fullName);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'roleChange',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee SET roleId = (SELECT id FROM role WHERE title = ? ) WHERE id = (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(firstName," ",lastName) = ?) AS tmptable)`, [answer.employee, answer.roleChange], (err, results) => {
                if (err) throw err;
                userOptions();
            })
        })


    })

}

const allRoles = () => {
    const allRole = 'SELECT title AS "Title" FROM role';
    connection.query(allRole, (err, results) => {
        if (err) throw err;

        console.log(' ');
        console.table(chalk.yellow('All Roles'), results);
        userOptions();
    })

}

const addRole = () => {
    const addRole = `SELECT * FROM roles; SELECT * FROM departments`
    connection.query(addRole, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('Here are the roles availible'), results[0]);

        inquirer.prompt([
            {
                name: 'addTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'addSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'addDepart',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.name);
                    return choiceArray;
                },
                message: 'Select the Department for this new Title:'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO role(title, salary, departmentId) VALUES ("${answer.addTitle}", "${answer.addSalary}", (SELECT id FROM department WHERE name = "${answer.addDepart}"));`)
            userOptions();

        })
    })

}

removeRole = () => {
    const removeRoles = `SELECT * FROM role`;
    connection.query(removeRoles, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'removeRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.title);
                    return choiceArray;
                },
                message: 'Select a Role to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM role WHERE ? `, { title: answer.removeRole });
            userOptions();

        })

    })

}


const allDepartments = () => {
    const allDepart = `SELECT name AS "Departments" FROM department`;
    connection.query(allDepart, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('Here is the list of avalible departments'), results)
        userOptions();
    })
}

const addDepartments = () => {
    const addDepart = `SELECT name AS "Departments" FROM department`;
    connection.query(addDepart, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('Heres the update departments list'), results);

        inquirer.prompt([
            {
                name: 'addDepart',
                type: 'input',
                message: 'Please enter a department to be added'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO department (name) VALUES( ? )`, answer.addDepart)
            userOptions();
        })
    })
}

const removeDepartments = () => {
    const removeDepart = `SELECT * FROM department`;
    connection.query(removeDepart, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'depart',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.name);
                    return choiceArray;
                },
                message: 'Which department would you like removed'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM department WHERE ? `, { name: answer.depart })
            userOptions();
        })
    })

}

userOptions();