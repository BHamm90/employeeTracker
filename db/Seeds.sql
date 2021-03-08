USE employee_db;

INSERT INTO Department
    (name)
VALUES
    ('Owners'),
    ('Sales'),
    ('Finance'),
    ('Service'),
    ('Techs'),
    ('Parts');

INSERT INTO Role
    (title, salary, departmentId)
VALUES
    ('Owner', 1000000000, 1),
    ('SalesManager', 100000, 2),
    ('SalesRep', 80000, 2),
    ('FinanceManager', 100000, 3),
    ('FinancePerson', 60000, 3),
    ('ServiceManager', 100000, 4),
    ('ServicePerson', 50000, 4),
    ('MasterTech', 90000, 5),
    ('Technician', 50000, 5),
    ('PartsManager', 100000, 6),
    ('PartsCounterman', 40000, 6);


INSERT INTO Employee
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
    ('Larry', 'Henoch', 4, 2),
    ('Todd', 'Hopkins', 5, 10),
    ('Chuck', 'Jones', 6, 3),
    ('Jessie', 'Jones', 7, 12),
    ('Rodger', 'Peck', 7, 12),
    ('Tony', 'Markowski', 7, 12),
    ('Tim', 'Snethen', 8, 12),
    ('Justin', 'Marlboro', 8, 12),
    ('Justin', 'Gagna', 9, 16),
    ('Bohdi', 'Hagnert', 9, 17),
    ('Rick', 'Rasumen', 10, 3),
    ('Brian', 'Hamm', 11, 20),
    ('Teddy', 'Smith', 11, 20),
    ('Erik', 'Wilson', 11, 20);