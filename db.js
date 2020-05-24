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
    return db.query(`SELECT * FROM doctor_info order by created_at DESC`);
};

module.exports.getDoctorinfo = (id) => {
    return db.query(`SELECT * FROM doctor_info WHERE id = $1;`, [id]);
};

module.exports.getDoctor = (id) => {
    return db.query(`SELECT * FROM  doctor_info WHERE id = $1;`, [id]);
};
