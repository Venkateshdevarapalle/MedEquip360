-- =====================================================
-- MedEquip360 Database
-- AI-Powered Medical Equipment Supply & Service Management
-- =====================================================

DROP DATABASE IF EXISTS medequip360;
CREATE DATABASE medequip360;
USE medequip360;

-- =====================================================
-- Hospitals
-- =====================================================

CREATE TABLE Hospitals (
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Suppliers
-- =====================================================

CREATE TABLE Suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Equipment
-- =====================================================

CREATE TABLE Equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    manufacturer VARCHAR(120),
    model_number VARCHAR(100),
    serial_number VARCHAR(120) UNIQUE,
    quantity INT DEFAULT 0,
    unit_price DECIMAL(12,2),
    supplier_id INT,
    purchase_date DATE,
    status ENUM(
        'Available',
        'In Use',
        'Under Maintenance',
        'Out of Stock'
    ) DEFAULT 'Available',

    FOREIGN KEY (supplier_id)
    REFERENCES Suppliers(supplier_id)
    ON DELETE SET NULL
);

-- =====================================================
-- Orders
-- =====================================================

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT,
    equipment_id INT,
    quantity INT NOT NULL,
    total_amount DECIMAL(12,2),
    order_status ENUM(
        'Pending',
        'Approved',
        'Delivered',
        'Cancelled'
    ) DEFAULT 'Pending',

    order_date DATE,

    FOREIGN KEY (hospital_id)
        REFERENCES Hospitals(hospital_id),

    FOREIGN KEY (equipment_id)
        REFERENCES Equipment(equipment_id)
);

-- =====================================================
-- Maintenance
-- =====================================================

CREATE TABLE Maintenance (
    maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT,

    service_type VARCHAR(100),

    service_date DATE,

    next_service_date DATE,

    engineer_name VARCHAR(100),

    remarks TEXT,

    status ENUM(
        'Completed',
        'Scheduled',
        'Pending'
    ) DEFAULT 'Pending',

    FOREIGN KEY (equipment_id)
        REFERENCES Equipment(equipment_id)
);

-- =====================================================
-- Warranty
-- =====================================================

CREATE TABLE Warranty (
    warranty_id INT AUTO_INCREMENT PRIMARY KEY,

    equipment_id INT,

    warranty_provider VARCHAR(120),

    start_date DATE,

    expiry_date DATE,

    warranty_status ENUM(
        'Active',
        'Expired'
    ) DEFAULT 'Active',

    FOREIGN KEY (equipment_id)
        REFERENCES Equipment(equipment_id)
);
-- =====================================================
-- SAMPLE HOSPITALS
-- =====================================================

INSERT INTO Hospitals
(hospital_name,address,city,state,contact_person,phone,email)
VALUES
('Apollo Hospital','Road No.1','Hyderabad','Telangana','Dr. Ramesh','9876543210','apollo@gmail.com'),
('Yashoda Hospital','Somajiguda','Hyderabad','Telangana','Dr. Kavitha','9876543211','yashoda@gmail.com'),
('KIMS Hospital','Secunderabad','Hyderabad','Telangana','Dr. Praveen','9876543212','kims@gmail.com'),
('Care Hospital','Banjara Hills','Hyderabad','Telangana','Dr. Mahesh','9876543213','care@gmail.com'),
('AIIMS Mangalagiri','Mangalagiri','Guntur','Andhra Pradesh','Dr. Suresh','9876543214','aiims@gmail.com'),
('NRI Hospital','Chinakakani','Guntur','Andhra Pradesh','Dr. Rao','9876543215','nri@gmail.com'),
('Ramesh Hospital','Governorpet','Vijayawada','Andhra Pradesh','Dr. Prasad','9876543216','ramesh@gmail.com'),
('Andhra Hospital','Governorpet','Vijayawada','Andhra Pradesh','Dr. Sandeep','9876543217','andhra@gmail.com'),
('Government General Hospital','Kurnool','Kurnool','Andhra Pradesh','Dr. Srinivas','9876543218','ggh@gmail.com'),
('Sunshine Hospital','Gachibowli','Hyderabad','Telangana','Dr. Keerthi','9876543219','sunshine@gmail.com');

-- =====================================================
-- SAMPLE SUPPLIERS
-- =====================================================

INSERT INTO Suppliers
(supplier_name,company,phone,email,address,city,state)
VALUES
('Rajesh Kumar','MedTech India','9000000001','medtech@gmail.com','Madhapur','Hyderabad','Telangana'),
('Anil Reddy','Care Equipments','9000000002','careequip@gmail.com','Ameerpet','Hyderabad','Telangana'),
('Vijay Sharma','Life Medical','9000000003','lifemed@gmail.com','Benz Circle','Vijayawada','Andhra Pradesh'),
('Srinivas Rao','Health Supplies','9000000004','health@gmail.com','Governorpet','Vijayawada','Andhra Pradesh'),
('Kiran Kumar','BioMed Systems','9000000005','biomed@gmail.com','Guntur','Guntur','Andhra Pradesh'),
('Mahesh Gupta','Global Medics','9000000006','global@gmail.com','Kukatpally','Hyderabad','Telangana'),
('Ravi Teja','Prime Healthcare','9000000007','prime@gmail.com','LB Nagar','Hyderabad','Telangana'),
('Ajay Singh','MediWorld','9000000008','mediworld@gmail.com','Vizag','Visakhapatnam','Andhra Pradesh'),
('Suresh Babu','Medical Hub','9000000009','medicalhub@gmail.com','Tirupati','Tirupati','Andhra Pradesh'),
('Naresh Kumar','Hospital Equipments Ltd','9000000010','hospitalequip@gmail.com','Warangal','Warangal','Telangana');

-- =====================================================
-- SAMPLE EQUIPMENT
-- =====================================================

INSERT INTO Equipment
(equipment_name,category,manufacturer,model_number,serial_number,quantity,unit_price,supplier_id,purchase_date,status)
VALUES
('MRI Scanner','Imaging','Siemens','MRI-900','MRI001',2,4500000,1,'2025-01-10','Available'),
('CT Scanner','Imaging','GE Healthcare','CT-500','CT001',3,3200000,2,'2025-02-12','Available'),
('X-Ray Machine','Radiology','Philips','XR-250','XR001',5,850000,3,'2025-03-05','Available'),
('Ultrasound Machine','Imaging','Samsung','US-120','US001',4,600000,4,'2025-02-20','Available'),
('ECG Machine','Cardiology','BPL','ECG-100','ECG001',10,50000,5,'2025-01-18','Available'),
('Ventilator','ICU','Drager','VENT-220','VENT001',8,750000,6,'2025-01-25','Available'),
('Defibrillator','Emergency','Philips','DEF-11','DEF001',6,250000,7,'2025-04-12','Available'),
('Patient Monitor','Monitoring','Mindray','PM-100','PM001',15,90000,8,'2025-03-08','Available'),
('Infusion Pump','ICU','B Braun','IP-10','IP001',20,45000,9,'2025-04-16','Available'),
('Anaesthesia Machine','Operation Theatre','GE','AN-900','AN001',3,1500000,10,'2025-05-01','Available');
-- =====================================================
-- SAMPLE ORDERS
-- =====================================================

INSERT INTO Orders
(hospital_id,equipment_id,quantity,total_amount,order_status,order_date)
VALUES
(1,1,1,4500000,'Delivered','2025-05-01'),
(2,3,2,1700000,'Delivered','2025-05-03'),
(3,5,5,250000,'Approved','2025-05-05'),
(4,8,3,270000,'Pending','2025-05-07'),
(5,2,1,3200000,'Delivered','2025-05-10'),
(6,6,2,1500000,'Approved','2025-05-12'),
(7,4,2,1200000,'Delivered','2025-05-15'),
(8,9,5,225000,'Pending','2025-05-18'),
(9,7,2,500000,'Approved','2025-05-20'),
(10,10,1,1500000,'Delivered','2025-05-22'),
(1,8,4,360000,'Delivered','2025-06-01'),
(2,9,3,135000,'Approved','2025-06-03'),
(3,6,1,750000,'Pending','2025-06-05'),
(4,5,6,300000,'Delivered','2025-06-08'),
(5,7,2,500000,'Approved','2025-06-11'),
(6,3,1,850000,'Delivered','2025-06-14'),
(7,2,1,3200000,'Pending','2025-06-18'),
(8,4,1,600000,'Approved','2025-06-20'),
(9,10,1,1500000,'Delivered','2025-06-23'),
(10,1,1,4500000,'Pending','2025-06-25');

-- =====================================================
-- SAMPLE MAINTENANCE RECORDS
-- =====================================================

INSERT INTO Maintenance
(equipment_id,service_type,service_date,next_service_date,engineer_name,remarks,status)
VALUES
(1,'Preventive Maintenance','2025-06-01','2025-12-01','Rajesh Kumar','Routine inspection completed','Completed'),
(2,'Calibration','2025-06-02','2025-12-02','Anil Reddy','Scanner calibrated','Completed'),
(3,'Repair','2025-06-04','2025-09-04','Vijay Sharma','Tube replaced','Completed'),
(4,'Preventive Maintenance','2025-06-05','2025-12-05','Kiran Kumar','Operating normally','Completed'),
(5,'Calibration','2025-06-07','2025-12-07','Mahesh Gupta','Accuracy verified','Completed'),
(6,'Repair','2025-06-09','2025-09-09','Ravi Teja','Cooling fan replaced','Completed'),
(7,'Inspection','2025-06-11','2025-12-11','Ajay Singh','Battery health checked','Completed'),
(8,'Preventive Maintenance','2025-06-13','2025-12-13','Naresh Kumar','System cleaned','Completed'),
(9,'Calibration','2025-06-15','2025-12-15','Rajesh Kumar','Flow rate verified','Completed'),
(10,'Inspection','2025-06-17','2025-12-17','Anil Reddy','All parameters normal','Completed'),
(1,'Annual Service','2025-07-01','2026-07-01','Vijay Sharma','Annual servicing','Scheduled'),
(2,'Annual Service','2025-07-03','2026-07-03','Kiran Kumar','Awaiting service','Scheduled'),
(3,'Inspection','2025-07-05','2026-01-05','Mahesh Gupta','Pending inspection','Pending'),
(4,'Calibration','2025-07-07','2026-01-07','Ravi Teja','Calibration due','Pending'),
(5,'Repair','2025-07-09','2025-10-09','Ajay Singh','Minor repair scheduled','Scheduled');

-- =====================================================
-- SAMPLE WARRANTY RECORDS
-- =====================================================

INSERT INTO Warranty
(equipment_id,warranty_provider,start_date,expiry_date,warranty_status)
VALUES
(1,'Siemens India','2025-01-10','2030-01-10','Active'),
(2,'GE Healthcare','2025-02-12','2030-02-12','Active'),
(3,'Philips India','2025-03-05','2029-03-05','Active'),
(4,'Samsung Medical','2025-02-20','2028-02-20','Active'),
(5,'BPL Medical','2025-01-18','2028-01-18','Active'),
(6,'Drager','2025-01-25','2030-01-25','Active'),
(7,'Philips Healthcare','2025-04-12','2029-04-12','Active'),
(8,'Mindray','2025-03-08','2028-03-08','Active'),
(9,'B Braun','2025-04-16','2029-04-16','Active'),
(10,'GE Healthcare','2025-05-01','2030-05-01','Active');

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_equipment_category
ON Equipment(category);

CREATE INDEX idx_equipment_status
ON Equipment(status);

CREATE INDEX idx_supplier_name
ON Suppliers(supplier_name);

CREATE INDEX idx_order_date
ON Orders(order_date);

CREATE INDEX idx_order_status
ON Orders(order_status);

CREATE INDEX idx_next_service
ON Maintenance(next_service_date);

CREATE INDEX idx_warranty_expiry
ON Warranty(expiry_date);

-- =====================================================
-- VIEWS
-- =====================================================

CREATE VIEW EquipmentInventory AS
SELECT
    equipment_id,
    equipment_name,
    category,
    manufacturer,
    quantity,
    unit_price,
    status
FROM Equipment;

CREATE VIEW HospitalOrders AS
SELECT
    o.order_id,
    h.hospital_name,
    e.equipment_name,
    o.quantity,
    o.total_amount,
    o.order_status,
    o.order_date
FROM Orders o
JOIN Hospitals h
ON o.hospital_id = h.hospital_id
JOIN Equipment e
ON o.equipment_id = e.equipment_id;

CREATE VIEW SupplierEquipment AS
SELECT
    s.supplier_name,
    e.equipment_name,
    e.category,
    e.quantity
FROM Suppliers s
JOIN Equipment e
ON s.supplier_id = e.supplier_id;

-- =====================================================
-- SAMPLE REPORT QUERIES
-- =====================================================

-- View all equipment
SELECT * FROM Equipment;

-- View all hospitals
SELECT * FROM Hospitals;

-- View all suppliers
SELECT * FROM Suppliers;

-- Equipment currently available
SELECT *
FROM Equipment
WHERE status='Available';

-- Orders awaiting approval
SELECT *
FROM Orders
WHERE order_status='Pending';

-- Total equipment count
SELECT COUNT(*) AS Total_Equipment
FROM Equipment;

-- Total hospitals
SELECT COUNT(*) AS Total_Hospitals
FROM Hospitals;

-- Total suppliers
SELECT COUNT(*) AS Total_Suppliers
FROM Suppliers;

-- Total completed maintenance
SELECT COUNT(*) AS Completed_Maintenance
FROM Maintenance
WHERE status='Completed';

-- Equipment quantity by category
SELECT
category,
SUM(quantity) AS Total_Quantity
FROM Equipment
GROUP BY category;

-- Supplier-wise equipment
SELECT
s.supplier_name,
COUNT(e.equipment_id) AS Equipment_Count
FROM Suppliers s
LEFT JOIN Equipment e
ON s.supplier_id=e.supplier_id
GROUP BY s.supplier_name;

-- Hospital order summary
SELECT
h.hospital_name,
COUNT(o.order_id) AS Total_Orders,
SUM(o.total_amount) AS Total_Value
FROM Hospitals h
LEFT JOIN Orders o
ON h.hospital_id=o.hospital_id
GROUP BY h.hospital_name;

-- Maintenance due in next 6 months
SELECT
equipment_id,
next_service_date
FROM Maintenance
ORDER BY next_service_date;

-- Warranty expiry report
SELECT
e.equipment_name,
w.expiry_date
FROM Warranty w
JOIN Equipment e
ON e.equipment_id=w.equipment_id
ORDER BY w.expiry_date;

-- Inventory value
SELECT
SUM(quantity * unit_price) AS Total_Inventory_Value
FROM Equipment;

-- =====================================================
-- END OF DATABASE
-- =====================================================
