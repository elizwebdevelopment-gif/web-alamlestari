function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function openRegisterWith(selected) {
  const paket = document.getElementById("paket");
  paket.value = selected;
  scrollToSection("register");
}

function resetForm() {
  document.getElementById("regForm").reset();
  document.getElementById("msg").style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("nama").value.trim();
  const phone = document.getElementById("whatsapp").value.trim();
  const email = document.getElementById("email").value.trim();
  const paket = document.getElementById("paket").value;
  const agree = document.getElementById("agree").checked;
  const note = document.getElementById("note").value.trim();
  const msgBox = document.getElementById("msg");

  // ===========================
  // VALIDASI FIELD WAJIB
  // ===========================
  if (!nama || !whatsapp || !email || !paket || !agree) {
    msgBox.style.display = "block";
    msgBox.style.background = "#ffecec";
    msgBox.style.color = "#b30000";
    msgBox.textContent = "Harap lengkapi semua field wajib.";
    return;
  }

  // ===========================
  // VALIDASI NOMOR HP (HANYA ANGKA)
  // ===========================
  const onlyNumber = /^[0-9]+$/;
  if (!onlyNumber.test(phone)) {
    msgBox.style.display = "block";
    msgBox.style.background = "#ffecec";
    msgBox.style.color = "#b30000";
    msgBox.textContent = "Nomor HP hanya boleh berisi angka.";
    return;
  }

  // ===========================
  // VALIDASI PANJANG NOMOR HP (10–13 digit)
  // ===========================
  if (phone.length < 10 || phone.length > 13) {
    msgBox.style.display = "block";
    msgBox.style.background = "#ffecec";
    msgBox.style.color = "#b30000";
    msgBox.textContent = "Nomor HP harus terdiri dari 10 hingga 13 digit.";
    return;
  }

  // ===========================
  // VALIDASI EMAIL FORMAT BENAR
  // ===========================
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    msgBox.style.display = "block";
    msgBox.style.background = "#ffecec";
    msgBox.style.color = "#b30000";
    msgBox.textContent = "Format email tidak valid. Contoh: nama@email.com";
    return;
  }

  // ===========================
  // KIRIM DATA KE GOOGLE SHEET
  // ===========================
  const scriptURL = "https://script.google.com/macros/s/AKfycby042hMEdOTd7r5a9titT7CUQlnNldaM5xqr5yxBky8MLeL8qcRLyl_VvTjiqeO7pKing/exec"; // Ganti dengan URL Apps Script Web App Anda
  const formData = {
    name: name,
    phone: phone,
    email: email,
    paket: paket,
    agree: agree ? "Yes" : "No",
    note: note,
  };

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(() => {
    console.log("Data berhasil dikirim ke Google Sheet");
  })
  .catch((error) => {
    console.error("Gagal mengirim data ke Google Sheet:", error);
  });

  // ===========================
  // KIRIM KE WHATSAPP
  // ===========================
  const waNumber = "6281290580243"; // ganti nomor admin
  const waMessage =
    `Halo Admin, saya ingin mendaftar.\n\n` +
    `Nama: ${name}\n` +
    `Email: ${email}\n` +
    `No. HP: ${phone}\n` +
    `Paket: ${paket}\n` +
    `Saya menyetujui syarat & ketentuan.\n` +
    `${note}`;

  const encodedMessage = encodeURIComponent(waMessage);
  const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

  window.open(waLink, "_blank");

  // ===========================
  // NOTIFIKASI DI WEBSITE
  // ===========================
  msgBox.style.display = "block";
  msgBox.style.background = "#eefbf0";
  msgBox.style.color = "#1b5e20";
  msgBox.textContent = "Terima kasih! Data Anda sudah tersimpan dan Anda akan diarahkan ke WhatsApp.";

  document.getElementById("regForm").reset();
}


const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

document.getElementById("hamburger").onclick = () => {
  document.getElementById("navMenu").classList.toggle("open");
};




