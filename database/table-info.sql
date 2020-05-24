  DROP TABLE IF EXISTS doctor_info;
 
   CREATE TABLE doctor_info(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      dob VARCHAR(255),
      qualification VARCHAR(255),
      specialization_id VARCHAR(255),
      office_number VARCHAR(255),
      personal_number VARCHAR(255) ,
      website_link VARCHAR(255) ,
      accept_public_insurence BOOLEAN,
      languages VARCHAR(255),
      email_id VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      pic_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

  DROP TABLE IF EXISTS specialization;

    CREATE TABLE specialization(
        id SERIAL PRIMARY KEY,
        specialization_name VARCHAR(255) NOT NULL
      );

INSERT INTO  specialization (specialization_name) VALUES ('Acupuncturist');
INSERT INTO  specialization (specialization_name) VALUES ('Allergist');
INSERT INTO  specialization (specialization_name) VALUES ('Anesthesiologist');
INSERT INTO  specialization (specialization_name) VALUES ('Audiologist');
INSERT INTO  specialization (specialization_name) VALUES ('Bariatric Physician');
INSERT INTO  specialization (specialization_name) VALUES ('Cardiac Electrophysiologist');
INSERT INTO  specialization (specialization_name) VALUES ('Cardiologist');
INSERT INTO  specialization (specialization_name) VALUES ('Cardiothoracic Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Chiropractor');
INSERT INTO  specialization (specialization_name) VALUES ('Colorectal Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Dentist');
INSERT INTO  specialization (specialization_name) VALUES ('Dermatologist');
INSERT INTO  specialization (specialization_name) VALUES ('Dietitian');
INSERT INTO  specialization (specialization_name) VALUES ('Ear, Nose and Throat Doctor');
INSERT INTO  specialization (specialization_name) VALUES ('Emergency Medicine Physician');
INSERT INTO  specialization (specialization_name) VALUES ('Endocrinologist');
INSERT INTO  specialization (specialization_name) VALUES ('Endodontist');
INSERT INTO  specialization (specialization_name) VALUES ('Family Physician');
INSERT INTO  specialization (specialization_name) VALUES ('Gastroenterologist');
INSERT INTO  specialization (specialization_name) VALUES ('Geneticist');
INSERT INTO  specialization (specialization_name) VALUES ('Geriatrician');
INSERT INTO  specialization (specialization_name) VALUES ('Hand Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Hematologist');
INSERT INTO  specialization (specialization_name) VALUES ('Immunologist');
INSERT INTO  specialization (specialization_name) VALUES ('Infectious Disease Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Integrative Health Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Internist');
INSERT INTO  specialization (specialization_name) VALUES ('Medical Ethicist');
INSERT INTO  specialization (specialization_name) VALUES ('Microbiologist');
INSERT INTO  specialization (specialization_name) VALUES ('Midwife');
INSERT INTO  specialization (specialization_name) VALUES ('Naturopathic Doctor');
INSERT INTO  specialization (specialization_name) VALUES ('Nephrologist');
INSERT INTO  specialization (specialization_name) VALUES ('Neurologist');
INSERT INTO  specialization (specialization_name) VALUES ('Neuropsychiatrist');
INSERT INTO  specialization (specialization_name) VALUES ('Neurosurgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Nurse Practitioner');
INSERT INTO  specialization (specialization_name) VALUES ('Nutritionist');
INSERT INTO  specialization (specialization_name) VALUES ('OB-GYN');
INSERT INTO  specialization (specialization_name) VALUES ('Occupational Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Oncologist');
INSERT INTO  specialization (specialization_name) VALUES ('Ophthalmologist');
INSERT INTO  specialization (specialization_name) VALUES ('Optometrist');
INSERT INTO  specialization (specialization_name) VALUES ('Oral Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Orthodontist');
INSERT INTO  specialization (specialization_name) VALUES ('Orthopedic Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Pain Management Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Pathologist');
INSERT INTO  specialization (specialization_name) VALUES ('Pediatric Dentist');
INSERT INTO  specialization (specialization_name) VALUES ('Pediatrician');
INSERT INTO  specialization (specialization_name) VALUES ('Periodontist');
INSERT INTO  specialization (specialization_name) VALUES ('Physiatrist');
INSERT INTO  specialization (specialization_name) VALUES ('Physical Therapist');
INSERT INTO  specialization (specialization_name) VALUES ('Physician Assistant');
INSERT INTO  specialization (specialization_name) VALUES ('Plastic Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Podiatrist');
INSERT INTO  specialization (specialization_name) VALUES ('Preventive Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Primary Care Doctor');
INSERT INTO  specialization (specialization_name) VALUES ('Prosthodontist');
INSERT INTO  specialization (specialization_name) VALUES ('Psychiatrist');
INSERT INTO  specialization (specialization_name) VALUES ('Psychologist');
INSERT INTO  specialization (specialization_name) VALUES ('Psychosomatic Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Psychotherapist');
INSERT INTO  specialization (specialization_name) VALUES ('Pulmonologist');
INSERT INTO  specialization (specialization_name) VALUES ('Radiation Oncologist');
INSERT INTO  specialization (specialization_name) VALUES ('Radiologist');
INSERT INTO  specialization (specialization_name) VALUES ('Reproductive Endocrinologist');
INSERT INTO  specialization (specialization_name) VALUES ('Rheumatologist');
INSERT INTO  specialization (specialization_name) VALUES ('Sleep Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Sports Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Surgical Oncologist');
INSERT INTO  specialization (specialization_name) VALUES ('Travel Medicine Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Urgent Care Specialist');
INSERT INTO  specialization (specialization_name) VALUES ('Urological Surgeon');
INSERT INTO  specialization (specialization_name) VALUES ('Urologist');
INSERT INTO  specialization (specialization_name) VALUES ('Vascular Surgeon');





 