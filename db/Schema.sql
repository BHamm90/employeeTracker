CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary INT (10) NOT NULL,
  departmentId INT (3) NOT NULL,
  INDEX dep_ind (departmentId),
  PRIMARY KEY (id),
  FOREIGN KEY (departmentId) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT (3) NOT NULL,
  managerId INT (3),
  PRIMARY KEY (id),
  FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (managerId) REFERENCES employee(id) ON DELETE SET NULL
);

