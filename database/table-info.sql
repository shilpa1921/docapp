  DROP TABLE IF EXISTS doctor_info;
 
   CREATE TABLE doctor_info(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      dob VARCHAR(255) NOT NULL,
      quelification VARCHAR(255) NOT NULL,
      specialization_id VARCHAR(255) NOT NULL,
      office_number  VARCHAR(255) NOT NULL,
      personal_number  VARCHAR(255) NOT NULL,
      website  VARCHAR(255) NOT NULL,
      accept_public_insurence BOOLEAN,
      spoken_languages  VARCHAR(255) NOT NULL,
      email_id VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      pic_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 