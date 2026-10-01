// 1. Logic Kalkulator Estimasi Biaya
function hitungEstimasi() {
const bahan = parseFloat(document.getElementById('bahanKayu')?.value || 0);
const panjang = parseFloat(document.getElementById('panjang')?.value || 0);
const lebar = parseFloat(document.getElementById('lebar')?.value || 0);
const atap = parseFloat(document.getElementById('jenisAtap')?.value || 0);

const luas = panjang * lebar;
const total = (luas * bahan) + (luas * atap);

const displayElement = document.getElementById('totalEstimasi');
if (displayElement) {
    displayElement.innerText = "Rp " + total.toLocaleString('id-ID');
}


}

document.getElementById('calcForm')?.addEventListener('input', hitungEstimasi);

function pesanKalkulatorWA() {
const total = document.getElementById('totalEstimasi')?.innerText || "0";
const p = document.getElementById('panjang')?.value;
const l = document.getElementById('lebar')?.value;

const text = `Halo Admin, saya ingin pesan/konsultasi gazebo dengan ukuran ${p}x${l} meter. Estimasi biaya kalkulator website: ${total}`;
window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');


}

// 2. Filter & Pencarian Katalog Produk
function filterKategori(kategori) {
const items = document.querySelectorAll('.produk-item');
items.forEach(item => {
if (kategori === 'semua' || item.dataset.kategori === kategori) {
item.style.display = 'block';
} else {
item.style.display = 'none';
}
});
}

function cariProduk() {
const query = document.getElementById('searchInput')?.value.toLowerCase();
const items = document.querySelectorAll('.produk-item');

items.forEach(item => {
    const title = item.querySelector('h3').innerText.toLowerCase();
    if (title.includes(query)) {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
});


}

// 3. Interactive Star Picker & Review Form Submisi
const starPicker = document.getElementById('starPicker');
if (starPicker) {
const stars = starPicker.querySelectorAll('i');
stars.forEach(star => {
star.addEventListener('click', () => {
const val = parseInt(star.dataset.value);
document.getElementById('selectedRating').value = val;

        stars.forEach((s, idx) => {
            if (idx < val) {
                s.classList.add('text-amber-400');
                s.classList.remove('text-gray-300');
            } else {
                s.classList.remove('text-amber-400');
                s.classList.add('text-gray-300');
            }
        });
    });
});


}

document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
e.preventDefault();
const nama = document.getElementById('namaPengulas').value;
const lokasi = document.getElementById('lokasiPengulas').value;
const rating = document.getElementById('selectedRating').value;
const pesan = document.getElementById('pesanUlasan').value;

let starIcons = '';
for (let i = 0; i < rating; i++) {
    starIcons += '<i class="fa-solid fa-star"></i>';
}

const reviewCard = document.createElement('div');
reviewCard.className = "bg-white p-5 rounded-xl shadow border";
reviewCard.innerHTML = `
    <div class="flex justify-between items-start mb-2">
        <div>
            <h4 class="font-bold">${nama}</h4>
            <span class="text-xs text-gray-400">${lokasi}</span>
        </div>
        <div class="flex text-amber-400 text-xs">${starIcons}</div>
    </div>
    <p class="text-sm text-gray-700">"${pesan}"</p>
`;

document.getElementById('reviewFeed').prepend(reviewCard);
e.target.reset();
alert('Terima kasih! Ulasan Anda berhasil ditambahkan.');


});