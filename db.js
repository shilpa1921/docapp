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
    qulification,
    category,
    password
) => {
    return db.query(
        `
    INSERT INTO doctor_info (first_name, last_name, email,quelification,category,  password)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
        [first_name, last_name, emailadd, qulification, category, password]
    );
};

module.exports.getDoctorinfo = (id) => {
    return db.query(`SELECT * FROM doctor_info WHERE id = $1;`, [id]);
};
module.exports.saveProfilePic = (user_id, url) => {
    return db.query(
        `UPDATE doctor_info
        SET pic_url = $2
        WHERE id=$1 RETURNING *`,
        [user_id, url]
    );
};
