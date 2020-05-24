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
    website_link
) => {
    return db.query(
        `UPDATE doctor_info
        SET qualification = $2, specialization_id = $3, dob = $4, office_number = $5, personal_number = $6, languages = $7,  website_link = $8
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
