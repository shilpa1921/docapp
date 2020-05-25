const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/docapp"
);

module.exports.addData = (first_name, last_name, emailadd, password) => {
    return db.query(
        `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES($1, $2, $3, $4) RETURNING id`,
        [first_name, last_name, emailadd, password]
    );
};
module.exports.getpass = (email) => {
    return db
        .query(`SELECT * FROM users WHERE email = $1;`, [email])
        .then((results) => {
            console.log("result from getpass in db.js", results);
            return results;
        })
        .catch((err) => {
            console.log("errrrrrrr", err);
        });
};
module.exports.getpassdoc = (email) => {
    return db
        .query(`SELECT * FROM doctor_info WHERE email_id = $1;`, [email])
        .then((results) => {
            console.log("result from getpass in db.js", results);
            return results;
        })
        .catch((err) => {
            console.log("errrrrrrr", err);
        });
};

module.exports.addDataToDoctorinfo = (
    first_name,
    last_name,
    emailadd,
    password
) => {
    return db.query(
        `
    INSERT INTO doctor_info (first_name, last_name, email_id, password)
    VALUES($1, $2, $3, $4) RETURNING id`,
        [first_name, last_name, emailadd, password]
    );
};
module.exports.addDocAddress = (
    userId,
    street,
    house_no,
    city,
    state,
    country,
    zip_code,
    lat,
    lng
) => {
    return db.query(
        `
    INSERT INTO doctor_address (Doctor_id, street, house_no, city, state, country, pincode, latitude, longitude)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [userId, street, house_no, city, state, country, zip_code, lat, lng]
    );
};

module.exports.getDoctorinfo = (id) => {
    return db.query(`SELECT * FROM doctor_info WHERE id = $1;`, [id]);
};
module.exports.getSpecializationList = () => {
    return db.query(`SELECT * FROM specialization ;`);
};
module.exports.saveProfilePic = (user_id, url) => {
    return db.query(
        `UPDATE doctor_info
        SET pic_url = $2
        WHERE id=$1 RETURNING *`,
        [user_id, url]
    );
};

module.exports.updateDocInfo = (
    userId,
    qualification,
    category_id,
    dob,
    office_number,
    personal_number,
    spoken_lang,
    website_link,
    insurence
) => {
    return db.query(
        `UPDATE doctor_info
        SET qualification = $2, specialization_id = $3, dob = $4, office_number = $5, personal_number = $6, languages = $7,  website_link = $8, accept_public_insurence = $9
        WHERE id=$1 RETURNING *`,
        [
            userId,
            qualification,
            category_id,
            dob,
            office_number,
            personal_number,
            spoken_lang,
            website_link,
            insurence,
        ]
    );
};

module.exports.saveProfilePic = (user_id, url) => {
    return db.query(
        `UPDATE doctor_info
        SET pic_url = $2
        WHERE id=$1 RETURNING *`,
        [user_id, url]
    );
};

module.exports.getMatchingDoctors = (val, id) => {
    return db.query(
        `SELECT * FROM doctor_info WHERE id != $2 AND first_name ILIKE $1;`,
        [val + "%", id]
    );
};

module.exports.allDoctors = () => {
    return db.query(
        `SELECT doctor_info.*, doctor_address.* FROM doctor_info INNER JOIN doctor_address ON(doctor_info.id = doctor_address.Doctor_id)`
    );
};

module.exports.getDoctorinfo = (id) => {
    return db.query(`SELECT * FROM doctor_info WHERE id = $1;`, [id]);
};

module.exports.getDoctor = (id) => {
    return db.query(`SELECT * FROM  doctor_info WHERE id = $1;`, [id]);
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING email;`,
        [email, code]
    );
};
module.exports.addCodeDoc = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes_doc (email, code) VALUES ($1, $2) RETURNING email;`,
        [email, code]
    );
};

module.exports.checkCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes') AND (email = $1) ORDER BY id DESC LIMIT 1;`,
        [email]
    );
};
module.exports.checkCodeDoc = (email) => {
    return db.query(
        `SELECT * FROM reset_codes_doc WHERE (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes') AND (email = $1) ORDER BY id DESC LIMIT 1;`,
        [email]
    );
};
module.exports.updatePassword = (email, password) => {
    return db.query(`UPDATE users SET password = $2 WHERE email = $1;`, [
        email,
        password,
    ]);
};
module.exports.updatePasswordDoc = (email, password) => {
    return db.query(
        `UPDATE doctor_info SET password = $2 WHERE email_id = $1;`,
        [email, password]
    );
};
