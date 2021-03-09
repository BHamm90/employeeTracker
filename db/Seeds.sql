USE employee_db;

INSERT INTO department
    (name)
VALUES
    ('Owners'),
    ('Managers'),
    ('Sales'),
    ('Finance'),
    ('Service'),
    ('Techs'),
    ('Parts');

INSERT INTO role
    (title, salary, departmentId)
VALUES
    ('Owner', 1000000000, 1),
    ('Managers', 100000, 2),
    ('SalesRep', 80000, 3),
    ('FinancePerson', 60000, 4),
    ('ServicePerson', 50000, 5),
    ('MasterTech', 90000, 6),
    ('Technician', 50000, 6),
    ('PartsCounterman', 40000, 7);


INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES
    ('Scott', 'Conklin', 1, NULL),
    ('Bud', 'Conklin', 1, NULL),
    ('Stuart', 'Conklin', 1, NULL),
    ('Brian', 'Garrett', 2, 1),
    ('Scott', 'Johnson', 2, 1),
    ('Javier', 'Lopez', 2, 1),
    ('Ronda', 'Crist', 3, 5),
    ('Pam', 'Severson', 3, 4),
    ('Kam', 'Xaysongkham', 3, 6),
    ('Larry', 'Henoch', 2, 2),
    ('Todd', 'Hopkins', 4, 10),
    ('Chuck', 'Jones', 2, 3),
    ('Jessie', 'Jones', 5, 12),
    ('Rodger', 'Peck', 5, 12),
    ('Tony', 'Markowski', 5, 12),
    ('Tim', 'Snethen', 6, 12),
    ('Justin', 'Marlboro', 6, 12),
    ('Justin', 'Gagna', 7, 16),
    ('Bohdi', 'Hagnert', 7, 17),
    ('Rick', 'Rasumen', 2, 3),
    ('Brian', 'Hamm', 8, 20),
    ('Teddy', 'Smith', 8, 20),
    ('Erik', 'Wilson', 8, 20);