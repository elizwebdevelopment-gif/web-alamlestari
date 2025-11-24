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
  const pkg = document.getElementById("package").value;
  const agree = document.getElementById("agree").checked;
  const msgBox = document.getElementById("msg");

  if (!name || !phone || !pkg || !agree) {
    msgBox.style.display = "block";
    msgBox.style.background = "#ffecec";
    msgBox.style.color = "#b30000";
    msgBox.textContent = "Harap lengkapi semua field wajib.";
    return;
  }
  
  msgBox.style.display = "block";
  msgBox.style.background = "#eefbf0";
  msgBox.style.color = "#1b5e20";
  msgBox.textContent = "Terima kasih! Pendaftaran Anda telah dikirim.";
  
/*
  const nomorWA = 6285243126794
  const message = `Nama: ${name}\nNo. Whatsapp: ${phone}\nPaket Pelatihan: ${pkg}\nPertanyaan: ${msgBox}';
  const whatsappUrl = `https://wa.me/${nomorWA}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
*/


  document.getElementById("regForm").reset();
}
