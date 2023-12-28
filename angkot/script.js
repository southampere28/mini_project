// membuat object angkot

function Angkot (sopir, trayek, penumpang, kas) {
    
    this.sopir = sopir;
    this.trayek = trayek;
    this.penumpang = penumpang;
    this.kas = kas;

    this.penumpangNaik = function(namaPenumpang) {
        if (this.penumpang.includes(namaPenumpang)) {
            alert('penumpang sudah ada!');
        } else {
            this.penumpang.push(namaPenumpang);
        }
        return this.penumpang;
    }

    this.penumpangTurun = function(namaPenumpang, bayar) {
        if (this.penumpang.length === 0) {
            alert('penumpang kosong');
            return false;
        }

        for ( var i = 0; i < this.penumpang.length; i++) {
            if (this.penumpang[i] === namaPenumpang) {
                alert('penumpang berhasil turun');
                // this.penumpang[i] = undefined;
                this.penumpang.splice(i,1);
                this.kas += bayar;
                return true;
            }
        }
        
        alert('tidak ada penumpang dengan nama yang sama');
        return this.penumpang;
        
    }

}

var angkot1 = new Angkot('Pramudya', ['kediri', 'nganjuk'], [], 0);
// angkot1.penumpangNaik("atilah");
// angkot1.penumpangNaik("jono");

var angkot2 = new Angkot('Mahendra', ['kertosono', 'jombang'], [], 0);

// document.body.innerHTML = "<H1> angkot 1 </H1>";
// document.body.innerHTML = "<H3> sopir = "+ angkot1.sopir +"</H3>";
// document.body.innerHTML = "<H3> sopir = "+ angkot1.sopir +"</H3>";
// document.body.innerHTML = "<H1> angkot 1 </H1>";


function updateAngkotInfo() {
    var angkotInfoElement = document.getElementById("angkotInfo");
    
    angkotInfoElement.innerHTML = "<p><strong>Sopir:</strong>" + angkot1.sopir + 
    "</p>" + "<p><strong>Trayek:</strong>" + angkot1.trayek.join(' => ') + "</p>" +
    "<p><strong>Penumpang:</strong>"+ angkot1.penumpang.join(', ') + "</p>" +
    "<p><strong>Kas:</strong>"+ angkot1.kas + "</p>";
}

function addPassenger() {
    var passengerNameInput = document.getElementById('passengerName');
    var passengerName = passengerNameInput.value.trim();

    if (passengerName != '') {
        angkot1.penumpangNaik(passengerName);
        passengerNameInput.value = ''; // Mengosongkan input setelah penumpang ditambahkan
    }

    updateAngkotInfo();
}

updateAngkotInfo();