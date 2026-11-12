// ===== Data mahasiswa =====
const DEFAULT = { nama: "Nama Mahasiswa", kelas: "SI-3X" };
const MAHASISWA = { nama: "Jihan Nabilah Lubis", kelas: "SI-3C" };

const salam = document.getElementById("salam");
const kelasMhs = document.getElementById("kelasMhs");
const links = document.querySelectorAll("#menu a");
const cards = document.querySelectorAll(".card");

// ganti teks dengan animasi singkat
function ubahTeks(el, teks) {
  el.classList.add("swap");
  setTimeout(() => { el.textContent = teks; el.classList.remove("swap"); }, 200);
}
const setNama = nama => ubahTeks(salam, "Selamat Datang, " + nama);
const setKelas = kelas => ubahTeks(kelasMhs, "Kelas " + kelas);

function setActive(page) {
  links.forEach(a => a.classList.toggle("active", a.dataset.page === page));
}

// beri highlight pada kartu; warm = warna ungu
function highlight(ids, warm = false) {
  cards.forEach(c => c.classList.remove("focus", "warm"));
  ids.forEach(id => document.getElementById(id).classList.add(warm ? "warm" : "focus"));
}

function goTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== Aksi tiap menu =====
const actions = {
  home() {
    setNama(DEFAULT.nama);
    setKelas(DEFAULT.kelas);
    highlight([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  mahasiswa() {
    setNama(MAHASISWA.nama);       // hanya nama yang berubah
    highlight([]);
    goTo("home");
  },
  kelas() {                        // hanya mengubah tulisan kelas menjadi SI-3C
    setKelas(MAHASISWA.kelas);
    highlight([]);
    goTo("home");
  },
  aktivitas() {                    // Progres Kelas + Aktifitas Selanjutnya, warna ungu
    highlight(["progres", "aktivitas"], true);
    goTo("progres");
  },
  statistik() {
    highlight(["statistik"]);
    goTo("statistik");
  },
  dokumen() {
    highlight(["dokumen"]);
    goTo("dokumen");
  },
  settings() {                     // ganti tema terang/gelap
    document.body.classList.toggle("dark");
  },
  signout() {
    if (confirm("Yakin ingin keluar?")) {
      setActive("home");
      actions.home();
    }
  }
};

links.forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  const page = a.dataset.page;
  if (page !== "settings" && page !== "signout") setActive(page);
  actions[page]();
}));

// ===== Pencarian =====
document.getElementById("cari").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll(".item").forEach(it => {
    it.hidden = q !== "" && !it.textContent.toLowerCase().includes(q);
  });
});