const express = require("express");
const app = express();
const compression = require("compression");

const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const db = require("./db");
const ses = require("./ses");
// const cryptoRandomString = require("crypto-random-string");

const csurf = require("csurf");
const s3 = require("./s3");
const config = require("./config.json");
const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        //note: check userId name once cookie written
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("/logout", (req, res) => {
    req.session.userId = null;
    console.log("id in logout", req.session.userId);
    res.redirect("/");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("req.body", req.body);
    var first_name = req.body.first;
    var last_name = req.body.last;
    var dob = req.body.dob;
    var personal_number = req.body.personal_number;
    var patient_insurence = req.body.patient_insurence;
    var pat_insurence;

    if (patient_insurence == "yes") {
        pat_insurence = true;
    } else {
        pat_insurence = false;
    }
    var emailadd = req.body.email;
    var password = req.body.password;
    console.log("req.body.password", req.body.password);
    var pass;
    if (req.body.password) {
        hash(password)
            .then((hashedPw) => {
                console.log("HashedPW in /register", hashedPw);
                pass = hashedPw;
                return pass;
                // once the user info is stored in the database you will want to store the user id in the cookie
            })
            .then((pass) => {
                console.log("hashed password", pass);

                db.addDataToPat(
                    first_name,
                    last_name,
                    dob,
                    personal_number,
                    emailadd,
                    pass,
                    pat_insurence
                )
                    .then((results) => {
                        req.session.userId = results.rows[0].id;
                        console.log("userid", req.session.userId);
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("Error in post registration ", err);
                        res.json({ duplicate: true });
                    });
            });
    } else {
        res.json({ success: false });
    }
});
app.post("/register-doc", (req, res) => {
    console.log("req.body", req.body);
    var first_name = req.body.first;
    var last_name = req.body.last;
    var emailadd = req.body.email;
    var password = req.body.password;

    console.log("req.body.password", req.body.password);
    var pass;
    if (req.body.password) {
        hash(password)
            .then((hashedPw) => {
                console.log("HashedPW in /register", hashedPw);
                pass = hashedPw;
                return pass;
                // once the user info is stored in the database you will want to store the user id in the cookie
            })
            .then((pass) => {
                console.log("hashed password", pass);

                db.addDataToDoctorinfo(
                    first_name,
                    last_name,
                    emailadd,

                    pass
                )
                    .then((results) => {
                        req.session.userId = results.rows[0].id;
                        console.log("userid", req.session.userId);
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("Error in post registration ", err);
                        res.json({ duplicate: true });
                    });
            });
    } else {
        res.json({ success: false });
    }
});
app.post("/login", (req, res) => {
    console.log("req.body", req.body);

    let email = req.body.email;
    let password = req.body.password;

    let dbpass;

    db.getpass(email)
        .then((result) => {
            console.log("password", result);
            dbpass = result.rows[0].password;
            id = result.rows[0].id;
            // req.session.userId = result.rows[0].id;
            return dbpass;
            console.log("dbpassword", dbpass);
        })
        .then((dbpass) => {
            return compare(password, dbpass);
        })
        .then((match) => {
            console.log("match", match);
            if (match) {
                req.session.userId = id;
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in login", err);
            res.json({ success: false });
        });
});
app.post("/login-doc", (req, res) => {
    console.log("req.body", req.body);

    let email = req.body.email;
    let password = req.body.password;

    let dbpass;

    db.getpassdoc(email)
        .then((result) => {
            console.log("password", result);
            dbpass = result.rows[0].password;
            id = result.rows[0].id;
            // req.session.userId = result.rows[0].id;
            return dbpass;
            console.log("dbpassword", dbpass);
        })
        .then((dbpass) => {
            return compare(password, dbpass);
        })
        .then((match) => {
            console.log("match", match);
            if (match) {
                req.session.userId = id;
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in login", err);
            res.json({ success: false });
        });
});

app.post("/resetpassword/step1", (req, res) => {
    console.log("req.body", req.body);
    let email = req.body.email;
    db.getpass(req.body.email)
        .then((result) => {
            console.log("result in get paass step1", result);
            dbpass = result.rows[0].password;
            id = result.rows[0].id;
            console.log("shilpaaaaa122345", dbpass, id, result.rows[0].email);
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.addCode(email, secretCode)
                .then((result) => {
                    console.log("added code successfully", result);
                    let to = result.rows[0].email;
                    let subject = "Change Password link";
                    let text =
                        "This is the  code for your password reset: " +
                        secretCode;
                    console.log("info of send email", to, subject, text);
                    ses.sendEmail(to, subject, text);

                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error in adding code to table", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in get pass", err);
            res.json({ success: false });
        });
});
app.post("/upload-img", uploader.single("file"), s3.upload, (req, res) => {
    console.log("file", req.file.filename);
    console.log("id in upload-img", req.session.userId);

    if (req.file) {
        let filename = req.file.filename;
        let url = config.s3Url + filename;
        let id = req.session.userId;
        console.log("json", config.s3Url + filename);
        db.saveProfilePic(id, url)
            .then((result) => {
                console.log("url added successfully", result);
                let image = {
                    imageUrl: result.rows[0].pic_url,
                };
                console.log("Image object: ", image);
                res.json(image);
            })
            .catch((err) => {
                console.log("Error in db.addAvatar: ", err);
                res.json({ success: false });
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/user", (req, res) => {
    console.log("req.session.userId: ", req.session.userId);

    db.getDoctorinfo(req.session.userId)
        .then((result) => {
            console.log("result in /user: ", result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in /user getUserInfo: ", err);
        });
});

app.post("/resetpassword/verify", (req, res) => {
    let { email, code, password } = req.body;
    db.checkCode(email)
        .then(({ rows }) => {
            if (code === rows[0].code) {
                hash(password)
                    .then((hashedPw) => {
                        db.updatePassword(email, hashedPw)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("Error in update password: ", err);
                            });
                    })
                    .catch((err) => {
                        console.log("Error in hash: ", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("Error in db.checkCode: ", err);
        });
});

app.post("/user/:id", (req, res) => {
    console.log("id in other profile", req.params.id);
    let id = req.params.id;

    db.getDoctor(id)
        .then((result) => {
            console.log("result in /user:id: ", result.rows[0]);

            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in /user:id getUserInfo: ", err);
        });
});

app.post("/findDoctor", (req, res) => {
    console.log("shilpa varible", process.env);
    console.log("shilpa in find people", req.body.user);
    let id = req.session.userId;
    var lat = 0.0;
    var lng = 0.0;
    if (req.body.user) {
        db.getMatchingDoctors(req.body.user, lat, lng).then((results) => {
            console.log("results in findpeople search", results.rows);
            res.json(results.rows);
        });
    } else {
        db.allDoctors(lat, lng).then((result) => {
            console.log("results in findpeople", result.rows);
            res.json(result.rows);
        });
    }
});

app.post("/category", (req, res) => {
    console.log("req.body in category", req.body);

    var category_id = req.body.cat;

    db.searchByCategory(category_id).then((result) => {
        console.log("result in category111", result);
        res.json(result.rows);
    });
});
app.post("/category-1", (req, res) => {
    db.recentjoiners().then((result) => {
        console.log("results in findpeople", result.rows);
        res.json(result.rows);
    });
});

app.post("/resetpassword-doc/step1", (req, res) => {
    console.log("req.body", req.body);
    let email = req.body.email;
    db.getpassdoc(req.body.email)
        .then((result) => {
            console.log("result in get paass step1", result);
            dbpass = result.rows[0].password;
            id = result.rows[0].id;
            console.log("shilpaaaaa122345", dbpass, id, result.rows[0].email);
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.addCodeDoc(email, secretCode)
                .then((result) => {
                    console.log("added code successfully", result);
                    let to = result.rows[0].email;
                    let subject = "Change Password link";
                    let text =
                        "This is the  code for your password reset: " +
                        secretCode;
                    console.log("info of send email", to, subject, text);
                    ses.sendEmail(to, subject, text);

                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error in adding code to table", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in get pass", err);
            res.json({ success: false });
        });
});

app.post("/resetpassword-doc/verify", (req, res) => {
    let { email, code, password } = req.body;
    db.checkCodeDoc(email)
        .then(({ rows }) => {
            if (code === rows[0].code) {
                hash(password)
                    .then((hashedPw) => {
                        db.updatePasswordDoc(email, hashedPw)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("Error in update password: ", err);
                            });
                    })
                    .catch((err) => {
                        console.log("Error in hash: ", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("Error in db.checkCode: ", err);
        });
});

app.post("/userLoction", (req, res) => {
    console.log("req.body in /userLocation", req.body);

    lat = req.body.lat;
    lng = req.body.lng;
    db.allDoctors(lat, lng).then((result) => {
        console.log("results in /userlocation", result.rows);
        res.json(result.rows);
    });
});

app.post("/specializationList", (req, res) => {
    db.getSpecializationList().then((result) => {
        console.log("result in specialization list", result.rows);
        res.json(result.rows);
    });
});

app.post("/register-doc-info", (req, res) => {
    console.log("req.body in /register-doc-info", req.body);
    userId = req.session.userId;
    qualification = req.body.qualification;
    insurence_card = req.body.insurence;
    var insurence;

    if (insurence_card == "yes") {
        insurence = true;
    } else {
        insurence = false;
    }
    category_id = req.body.category_id;
    dob = req.body.dob;
    office_number = req.body.office_number;
    personal_number = req.body.personal_number;
    spoken_lang = req.body.spoken_lang;
    website_link = req.body.website_link;
    db.updateDocInfo(
        userId,
        qualification,
        category_id,
        dob,
        office_number,
        personal_number,
        spoken_lang,
        website_link,
        insurence
    ).then((result) => {
        console.log("result in/register-doc-info ", result);
        res.json({ success: true });
    });
});

app.post("/auto-address", (req, res) => {
    console.log("req.body in /auto-address", req.body);
    userId = req.session.userId;
    street = req.body.street;
    house_no = req.body.house_no;
    city = req.body.city;
    state = req.body.state;
    country = req.body.country;
    zip_code = req.body.zip_code;
    lat = req.body.lat;
    lng = req.body.lng;
    db.addDocAddress(
        userId,
        street,
        house_no,
        city,
        state,
        country,
        zip_code,
        lat,
        lng
    )
        .then((result) => {
            console.log("result in add doc address", result);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in add doc address", err);
            res.json({ success: false });
        });
});

app.post("/doc-availability", (req, res) => {
    console.log("req.body in /doc-availability", req.body);
    var userId = req.session.userId;
    var to = req.body.to;
    var from = req.body.from;
    var day = req.body.day;

    if (day == "saturday") {
        var sat_day = true;
        var sun_day = false;
    } else if (day == "sunday") {
        var sat_day = false;
        var sun_day = true;
    } else {
        var sat_day = true;
        var sun_day = true;
    }

    db.addInfoToAvailbilityDoctor(userId, sat_day, sun_day, from, to)
        .then((result) => {
            console.log(
                "result in add info to availability doctor table",
                result
            );
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in add info to availability", err);
            res.json({ success: false });
        });
});

app.post("/appointment-histroy", (req, res) => {
    console.log("req.body in  appointment-histroy", req.body);
    var appDate = req.body.appDate;
    var appTime = req.body.appTime;
    var doc_id = req.body.doc_id;
    var pat_id = req.session.userId;

    db.addDataToAppHistroy(pat_id, doc_id, appDate, appTime).then((result) => {
        console.log("result in addDataToAppHistroy", result);
        res.json({ success: true });
    });
    var first;
    var last;

    db.getInfoDocForMail(doc_id).then((result) => {
        console.log("result in getInfoDocForMAil", result);
        first = result.rows[0].first_name;
        last = result.rows[0].last_name;
    });

    db.getEmailId(pat_id).then((result) => {
        console.log("result in get Email id", result);
        let to = result.rows[0].email;
        let subject = "Appointment Confirmation";
        let text =
            "Hello" +
            " " +
            result.rows[0].first_name +
            " " +
            result.rows[0].last_name +
            " ," +
            "\n" +
            "You have an appointment on" +
            " " +
            appDate +
            " " +
            "at" +
            " " +
            appTime +
            " " +
            "\n" +
            "Doctor name:" +
            " " +
            first +
            " " +
            last +
            "\n" +
            "\n" +
            "Thank you" +
            "\n" +
            "docapp team";
        console.log("info of send email", to, subject, text);
        ses.sendEmail(to, subject, text);
    });
});

app.post("/get-timesloat", (req, res) => {
    console.log("req.body in get timeslot", req.body);
    var selectedDate = req.body.selectedDate;
    var doctor_id = req.body.doctor_id;
    db.getTimeSlot(doctor_id, selectedDate).then((result) => {
        console.log("result in  get time sloat", result.rows);
        res.json(result.rows);
    });
});

app.post("/get-workinghours", (req, res) => {
    console.log("req.body in get workinghours", req.body);
    var doctor_id = req.body.doctor_id;
    db.getDoctorWorkingHours(doctor_id).then((result) => {
        console.log("result working hours = ", result);
        res.json(result.rows);
    });
});

app.post("/morePost", (req, res) => {
    console.log("id in more post", req.body);

    return db
        .getMorePost(req.body.id)
        .then((result) => {
            console.log("result in /morePost", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("There is an error in More post ", err);
        });
});

app.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
