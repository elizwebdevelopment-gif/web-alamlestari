function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function openRegisterWith(selected) {
  const pkg = document.getElementById("package");
  pkg.value = selected;
  scrollToSection("register");
}

function resetForm() {
  document.getElementById("regForm").reset();
  document.getElementById("msg").style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const pkg = document.getElementById("package").value;
  const agree = document.getElementById("agree").checked;
  const msgBox = document.getElementById("msg");

  // ===========================
  // VALIDASI FIELD WAJIB
  // ===========================
  if (!name || !phone || !email || !pkg || !agree) {
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
  if (phone.length < 9 || phone.length > 14) {
    msgBox.style.display = "block";
    msgBox.style.background = "#ffecec";
    msgBox.style.color = "#b30000";
    msgBox.textContent = "Nomor HP harus terdiri dari 9 hingga 14 digit.";
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
  // KIRIM KE WHATSAPP
  // ===========================
  const waNumber = "6285240xxxxxx"; // ganti nomor admin
  const waMessage =
    `Halo Admin, saya ingin mendaftar.\n\n` +
    `Nama: ${name}\n` +
    `Email: ${email}\n` +
    `No. HP: ${phone}\n` +
    `Paket: ${pkg}\n` +
    `Saya menyetujui syarat & ketentuan.`;

  const encodedMessage = encodeURIComponent(waMessage);
  const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

  window.open(waLink, "_blank");

  // ===========================
  // NOTIFIKASI DI WEBSITE
  // ===========================
  msgBox.style.display = "block";
  msgBox.style.background = "#eefbf0";
  msgBox.style.color = "#1b5e20";
  msgBox.textContent = "Terima kasih! Anda akan diarahkan ke WhatsApp.";

  document.getElementById("regForm").reset();
}
