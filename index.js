const express = require("express") //memanggil Library Express JS
const bodyParser = require("body-parser") //memanggil library body-parser
const cors = require("cors") //memanggil library cors
const app = express()

// penggunaan body-parser untuk ekstrak data request berformas JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())



// endpoint "/test" dengan method GET
app.get("/test", (req,res) => {
    //req merupakan variabel yang berisi data request
    //res merupakan variabel yang berisi data response dari endpoint

    //membuat objek yang berisi data yang akan dijadikan response
    let response = {
        message: "Ini end-point pertama ku",
        method: req.method,
        code: res.statusCode
    }

    //memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
    // res.send("Hello world")
})


// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000")
})

// endpoint "/profil/nama/umur" dengan method GET
app.get("/profil/:name/:age", (req,res) => {
       // :name dan :age -> diberikan titik dua didepan menunjukkan "name" dan "age"
       // bersifat dinamis yang dapat diganti nilainya saat melakukan request
       
       // menampung data yang dikirimkan
       let name = req.params.name // mengampil nilai pd parameter name
       let age = req.params.age

       // membuat objek yang berisi data yang akan dijadikan response
       // response berisi data nama dan umur sesuai dengan nilai parameter
       let response = {
        nama: name,
        umur: age
       }

       // memberikan response dengan format JSON yang berisi objek di atas
       res.json(response)
})


// endpoint "/bujur_sangkar" dengan method POST

app.post("/bujur_sangkar", (req,res) => {
    // menampung data  yang dikirimkan dan mengkonversi menjadi tipe numerik
    let panjang = Number(req.body.panjang) // mengambil nilai panjang dari body

    let lebar   = Number(req.body.lebar) // mengambil nilai lebar dari body

    let luas = panjang * lebar
    let keliling = 2 * (panjang + lebar)

    //membuat objek yang berisi data yang akan dijadikan response 
    let response = {
        panjang: panjang,
        lebar: lebar,
        luas: luas,
        keliling: keliling
    }

    //memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})

app.post("/kubus", (req, res) => {
    let sisi = Number(req.body.sisi)

    let volume = sisi**3
    let luasper = 6 * (sisi**2)

    let response = {
        sisi: sisi,
        volume: volume,
        luasper: luasper
    }
    res.json(response)
})

app.post("/balok", (req, res) => {
    let panjang = Number(req.body.panjang)

    let lebar = Number(req.body.lebar)

    let tinggi = Number(req.body.tinggi)

    let volume = panjang*lebar*tinggi
    let luasper = 2 * (panjang*lebar + lebar*tinggi + panjang*tinggi)

    let response = {
        panjang: panjang,
        lebar: lebar,
        tinggi: tinggi,
        volume: volume,
        luasper: luasper
    }
    res.json(response)
})

app.post("/tabung", (req, res) => {
    let radius = Number(req.body.radius)
    let tinggi = Number(req.body.tinggi)

    let volume = 22/7*radius**2*tinggi
    let luasper = 2*22/7*radius * (radius+tinggi)
    let response = {
        radius: radius,
        tinggi: tinggi,
        volume: volume,
        luasper: luasper
    }
    res.json(response)
})

app.post("/kerucut", (req, res) => {
    let radius = Number(req.body.radius)
    let tinggi = Number(req.body.tinggi)
    let sisi = Number(req.body.sisi)
    let volume = 1/3 * 22/7 * radius**2 * tinggi
    let luasper = (22/7 * radius**2) + (22/7 * radius * sisi)
    let response = {
        radius: radius,
        tinggi: tinggi,
        sisi: sisi,
        volume: volume,
        luasper: luasper
    }
    res.json(response)
})

app.get("/convert/celcius/:celcius", (req,res) => {
    let celcius = Number(req.params.celcius)
    let fahrenheit = (9/5) * celcius + 32
    let reamur = 4/5 * celcius
    let kelvin = celcius + 273
    let response = {
        celcius: celcius,
        result: {
            fahrenheit: fahrenheit,
            reamur: reamur,
            kelvin: kelvin
        }
    }
    res.json(response)
}) 

app.get("/convert/fahrenheit/:fahrenheit", (req,res) => {
    let fahrenheit = Number(req.params.fahrenheit)
    let celcius = (5/9) * (fahrenheit - 32)
    let reamur = 4/9 * (fahrenheit - 32)
    let kelvin = (fahrenheit - 32) * 5/9 + 273.15
    let response = {
        fahrenheit: fahrenheit,
        result: {
            celcius: celcius,
            reamur: reamur,
            kelvin: kelvin
        }
    }
    res.json(response)
}) 


app.get("/convert/reamur/:reamur", (req,res) => {
    let reamur = Number(req.params.reamur)
    let fahrenheit = 9/4 * reamur + 32
    let celcius = 5/4 * reamur
    let kelvin = 5/4 * reamur + 273
    let response = {
        reamur: reamur,
        result: {
            celcius: celcius,
            fahrenheit: fahrenheit,
            kelvin: kelvin
        }
    }
    res.json(response)
}) 


app.get("/convert/kelvin/:kelvin", (req,res) => {
    let kelvin = Number(req.params.kelvin)
    let fahrenheit = (kelvin - 273.15) * 9/5 + 32  
    let celcius = kelvin - 273
    let reamur = 4/5 * (kelvin-273)
    let response = {
        kelvin: kelvin,
        result: {
            celcius: celcius,
            fahrenheit: fahrenheit,
            reamur: reamur
        }
    }
    res.json(response)
}) 


app.post("/convert/biner", (req,res) => {
    let biner = Number(req.body.biner)
    let decimal = parseInt(biner,2)
    let octal = parseInt(biner,2).toString(8)
    let hexa = parseInt(biner,2).toString(16)
    let response = {
        biner: biner,
        decimal: decimal,
        octal: octal,
        hexa: hexa
    }
    res.json(response)
}) 

app.post("/convert/decimal", (req,res) => {
    let decimal = Number(req.body.decimal)
    let biner = parseInt(decimal, 10).toString(2)
    let octal = parseInt(decimal, 10).toString(8)
    let hexa = parseInt(decimal, 10).toString(16)
    let response = {
        decimal: decimal,
        biner: biner,
        octal: octal,
        hexa: hexa
    }
    res.json(response)
}) 

app.post("/convert/hexa", (req,res) => {
    let hexa = Number(req.body.hexa)
    let biner = parseInt(hexa, 16).toString(2)
    let octal = parseInt(hexa, 16).toString(8)
    let decimal = parseInt(hexa, 16)
    let response = {
        hexa: hexa,
        biner: biner,
        octal: octal,
        decimal: decimal
    }
    res.json(response)
}) 

app.post("/convert/octal", (req,res) => {
    let octal = Number(req.body.octal)
    let biner = parseInt(octal, 8).toString(2)
    let hexa = parseInt(octal, 8).toString(16)
    let decimal = parseInt(octal, 8)
    let response = {
        octal: octal,
        biner: biner,
        hexa: hexa,
        decimal: decimal
    }
    res.json(response)
}) 


app.post("/bmi", (req, res) => {
    let tinggi = Number(req.body.tinggi)
    let berat = Number(req.body.berat)
    let bmi = berat / (tinggi**2)
    let status = ''
    if (bmi < 18.5) {
        status= 'Kekurangan Berat Badan'
    } else if (18.5 >= bmi <= 24.9) {
        status= 'Normal (ideal)'
    } else if (25 >= bmi >= 29.9 ) {
        status= 'Kelebihan berat badan'
    } else {
        status= 'Kegemukan'
    }
    let response = {
        tinggi: tinggi,
        berat: berat,
        bmi: bmi,
        status: status
    }
    res.json(response)
})

// Soal Tambahan
app.post("/angka", (req,res) => {
    let ang = Number(req.body.ang)
    let ket = ''
    if (ang % 2 == 1) {
        ket = 'Angka Tersebut Ganjil'
    } else if (ang % 2 == 0) {
        ket = 'Angka Tersebut Genap'
    }
    let response = {
        angka: ang,
        keterangan: ket
    }
    res.json(response)
}) 



