// Logika Kalkulator Estimasi Biaya
document.addEventListener('DOMContentLoaded', () => {
  const calcBahan = document.getElementById('calcBahan');
  const calcUkuran = document.getElementById('calcUkuran');
  const calcResult = document.getElementById('calcResult');
  const calcWaBtn = document.getElementById('calcWaBtn');

  function calculate() {
    if (!calcBahan || !calcUkuran) return;
    const hargaBahan = parseInt(calcBahan.value);
    const ukuranM2 = parseInt(calcUkuran.value);
    const atapRadio = document.querySelector('input[name="atap"]:checked');
    const hargaAtap = atapRadio ? parseInt(atapRadio.value) : 0;

    const total = (hargaBahan * ukuranM2) + hargaAtap;
    calcResult.textContent = 'Rp ' + total.toLocaleString('id-ID');
  }

  if (calcBahan && calcUkuran) {
    calcBahan.addEventListener('change', calculate);
    calcUkuran.addEventListener('change', calculate);
    document.querySelectorAll('input[name="atap"]').forEach(r => r.addEventListener('change', calculate));
    calculate();
  }

  if (calcWaBtn) {
    calcWaBtn.addEventListener('click', () => {
      const text = `Halo Admin, saya ingin memesan Gazebo dengan estimasi biaya ${calcResult.textContent}`;
      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
});