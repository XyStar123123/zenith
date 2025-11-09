-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 09, 2025 at 10:47 AM
-- Server version: 8.0.30
-- PHP Version: 8.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicare`
--

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kode_dokter` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dokter`
--

INSERT INTO `dokter` (`id`, `nama`, `kode_dokter`) VALUES
(1, 'dr. Rina Kurnia', 'zenith-c72-n87-p6c-a');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_temu`
--

CREATE TABLE `jadwal_temu` (
  `id_jadwal_temu` int NOT NULL,
  `id_pasien` int NOT NULL,
  `waktu_temu` time NOT NULL,
  `status` enum('Proses','Selesai') COLLATE utf8mb4_general_ci NOT NULL,
  `dibuat_pada` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jadwal_temu`
--

INSERT INTO `jadwal_temu` (`id_jadwal_temu`, `id_pasien`, `waktu_temu`, `status`, `dibuat_pada`) VALUES
(1, 3, '09:00:00', 'Selesai', '2025-10-27 14:10:15'),
(2, 1, '09:10:00', 'Selesai', '2025-10-27 14:31:55'),
(3, 8, '20:00:00', 'Selesai', '2025-10-28 06:54:20'),
(4, 11, '09:00:00', 'Selesai', '2025-11-07 09:02:13'),
(5, 2, '10:10:00', 'Selesai', '2025-11-07 09:12:58'),
(6, 12, '10:10:00', 'Selesai', '2025-11-07 09:27:43'),
(7, 13, '10:10:00', 'Selesai', '2025-11-07 10:01:10'),
(8, 14, '10:10:00', 'Selesai', '2025-11-07 10:11:05'),
(9, 16, '00:00:00', 'Selesai', '2025-11-07 10:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id` int NOT NULL,
  `kode_pasien` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nik` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `tempat_lahir` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id`, `kode_pasien`, `nama`, `nik`, `tanggal_lahir`, `tempat_lahir`, `alamat`) VALUES
(1, 'P0001', 'Agus Setiawan', '317410111140', '1995-03-15', 'Jakarta', 'Jl. Mawar No.1'),
(2, 'P0002', 'Bintang Putra Hermawan', '317410111141', '2000-07-20', 'Sidoarjo', 'Jl. Kemang'),
(3, 'P0003', 'Siti Hajar Aswat', '317410111150', '2010-06-20', 'Sidoarjo', 'Jl. Sidoarjo'),
(4, 'P0005', 'Bu Hanun', '98756878', '2003-07-24', 'Sidoarjo', 'Jl. Mana Aja'),
(5, 'P0006', 'marin', '3198222288733', '2009-09-02', 'Sidoarjo', 'jl. mangga'),
(7, 'P0019', 'Ahmad ', '78632946120983', '2021-02-25', 'Sidoarjo', 'Jl. kelinci'),
(8, 'P0010', 'Calya Mikaela Sachibi', '317410111150', '2006-10-11', 'Sidoarjo', 'Jl. Ahmad Yani'),
(9, 'P0009', 'Rekayasa Perangkat Lunak 1', '317410111150', '2009-10-10', 'Jombang', 'qwhndiqh3eiq2he'),
(11, 'P0012', 'Ahmad yusuf', '31', '2000-01-31', 'Sidoarjo', 'Jl. Ini Aja Saja'),
(12, 'P0013', 'aziz Safiqqurrohman', '1098013890138', '2009-10-09', 'Sidoarjo', 'jl in aja dulu'),
(13, 'P00013', 'Ahmad', '317410111150', '2000-10-10', 'Jombang', 'JL. IN AJA DULU\n'),
(14, 'P0014', 'Ahmad ucup', '299319381', '2000-10-10', 'Jombang', 'jl. in aja\n'),
(16, 'P0015', 'ahmad maulana', '35151001002', '2009-10-09', 'Jombang', 'jl, in aja \n\n');

-- --------------------------------------------------------

--
-- Table structure for table `rekam_medis`
--

CREATE TABLE `rekam_medis` (
  `id` int NOT NULL,
  `pasien_id` int NOT NULL,
  `tanggal_kunjungan` datetime DEFAULT CURRENT_TIMESTAMP,
  `riwayat_penyakit` text COLLATE utf8mb4_general_ci,
  `tekanan_darah` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `denyut_nadi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `suhu` decimal(4,1) DEFAULT NULL,
  `berat_badan` decimal(5,2) DEFAULT NULL,
  `pemeriksaan_penunjang` text COLLATE utf8mb4_general_ci,
  `diagnosa` text COLLATE utf8mb4_general_ci,
  `terapi_dan_anjuran` text COLLATE utf8mb4_general_ci,
  `resep_obat` text COLLATE utf8mb4_general_ci,
  `dibuat_pada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dokter_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rekam_medis`
--

INSERT INTO `rekam_medis` (`id`, `pasien_id`, `tanggal_kunjungan`, `riwayat_penyakit`, `tekanan_darah`, `denyut_nadi`, `suhu`, `berat_badan`, `pemeriksaan_penunjang`, `diagnosa`, `terapi_dan_anjuran`, `resep_obat`, `dibuat_pada`, `dokter_id`) VALUES
(1, 1, '2025-09-21 18:24:20', 'Hipertensi', '140/90 mmHg', '82x/menit', '36.8', '70.50', 'EKG Normal', 'Hipertensi Stage 1', 'Kurangi garam, olahraga rutin', 'Amlodipine 5mg', '2025-09-21 18:44:04', 1),
(2, 2, '2025-09-21 18:24:20', 'Tidak ada', '100/70 mmHg', '80x/menit, reguler', '36.5', '60.00', 'Tidak ada', 'Sehat', 'Tidak ada', 'Tidak ada', '2025-09-21 18:44:04', NULL),
(3, 1, '2025-09-21 20:36:23', 'Sakit Jantung', '120/80 mmHg', '82x/menit', '36.0', '60.00', 'Tidak ada', 'Sehat', 'Pola hidup sehat dan makan teratur', 'Vitamin dan suplemen', '2025-09-21 20:36:23', 1),
(4, 2, '2025-09-21 20:50:28', 'Pasien mengeluh batuk berdahak sejak 3 hari yang lalu, disertai demam ringan. Tidak ada riwayat penyakit kronis sebelumnya.', '120/80 mmHg', '78', '37.8', '62.00', 'Hasil rapid test antigen negatif, rontgen thorax menunjukkan tidak ada infiltrat paru.', 'Faringitis akut (radang tenggorokan).', 'Istirahat cukup, banyak minum air hangat, konsumsi vitamin C. Kontrol ulang bila gejala tidak membaik dalam 3–5 hari.', 'Paracetamol 500 mg, diminum 3× sehari setelah makan.\nAmoxicillin 500 mg, diminum 3× sehari selama 5 hari.', '2025-09-21 20:50:28', 1),
(5, 3, '2025-09-21 21:10:21', 'Mengeluh jika kepala sakit', '120/80', '70', '35.0', '45.00', 'Tidak ada', 'Sakit Kepala', 'Istirahat yang cukup dan tidur', 'Paramex 3x sehari', '2025-09-21 21:10:21', 1),
(6, 4, '2025-10-07 07:43:24', 'Tidak ada', '110/80 mmHg', '90', '37.0', '62.00', 'Tes darah pada lab', 'Demam dan Radang', 'Minum obat seusai anjuran', 'Paracetamol 3x sehari', '2025-10-07 07:43:24', 1),
(7, 3, '2025-10-27 21:03:15', 'Sehat', '120/80', '70', '30.0', '60.00', 'Tidak ada', 'Sehat', 'Olahraga', 'Vitamin 1x Sehari', '2025-10-27 21:03:15', 1),
(8, 8, '2025-10-28 13:53:42', 'Migrain', '100/80', '40', '40.0', '60.00', 'Tidak ada', 'Tidak ada', 'Tidak ada', 'Tidak ada', '2025-10-28 13:53:42', 1),
(9, 3, '2025-10-28 13:55:03', 'Sehat', '`120/80', '70', '30.0', '60.00', 'Tidak ada', 'Tidak ada', 'Tidak ada', 'Vitamin', '2025-10-28 13:55:03', 1),
(10, 1, '2025-11-06 11:03:34', '\"Pasien memiliki riwayat hipertensi ringan selama 2 tahun terakhir.', '130/85', '78', '36.7', '64.00', 'Hasil lab menunjukkan kadar kolesterol sedikit di atas normal.', 'Hipertensi tahap awal', 'Disarankan mengurangi konsumsi garam, rutin olahraga, dan kontrol tekanan darah tiap minggu.', 'Amlodipine 5mg, diminum 1x sehari setelah makan pagi.', '2025-11-06 11:03:34', 1),
(11, 11, '2025-11-07 16:02:58', 'Tidak ada', '120/80 mmHg', '70', '36.0', '60.00', 'Tidak ada', 'Tidak ada', 'Tidak ada', 'Tidak ada', '2025-11-07 16:02:58', 1),
(12, 2, '2025-11-07 16:14:48', 'skkizo', '190/100', '120bpm', '100.0', '20.00', 'nqdlinqlkneri', 'Faringitis akut (radang tenggorokan).', 'tidak ada', ';paracetamol 20mg', '2025-11-07 16:14:48', 1),
(13, 12, '2025-11-07 16:28:33', 'demam', '120/80 mmHg', '70bpm', '37.8', '50.00', 'tidak', 'Tidak ada', 'tidak ada', 'paracetamol', '2025-11-07 16:28:33', 1),
(14, 13, '2025-11-07 17:02:16', 'SKIZO', '120/80 mmHg', '90', '37.0', '50.00', 'TIDDAK ADAA', 'Tidak ada', 'IWDOWI', 'PARACETAMOL\n', '2025-11-07 17:02:16', 1),
(15, 8, '2025-11-07 17:05:06', 'Tidak ada', '120/80', '70', '36.5', '60.00', 'Tidak ada', 'Tidak ada', 'Tidak ada', 'Tidak ada', '2025-11-07 17:05:06', 1),
(16, 14, '2025-11-07 17:11:59', 'tidak ada', '120/80', '90', '37.8', '10.00', 'tidak ada', 'Sehat', 'tidak ada', 'paracetamol', '2025-11-07 17:11:59', 1),
(17, 16, '2025-11-07 17:36:44', 'demam', '120/80', '90', '40.0', '64.00', 'tidak ada', 'Demam dan Radang', '', 'paracetamol', '2025-11-07 17:36:44', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal_temu`
--
ALTER TABLE `jadwal_temu`
  ADD PRIMARY KEY (`id_jadwal_temu`),
  ADD KEY `id_pasien` (`id_pasien`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_pasien` (`kode_pasien`);

--
-- Indexes for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pasien_id` (`pasien_id`),
  ADD KEY `dokter_id` (`dokter_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dokter`
--
ALTER TABLE `dokter`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jadwal_temu`
--
ALTER TABLE `jadwal_temu`
  MODIFY `id_jadwal_temu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal_temu`
--
ALTER TABLE `jadwal_temu`
  ADD CONSTRAINT `jadwal_temu_ibfk_1` FOREIGN KEY (`id_pasien`) REFERENCES `pasien` (`id`);

--
-- Constraints for table `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD CONSTRAINT `rekam_medis_ibfk_1` FOREIGN KEY (`pasien_id`) REFERENCES `pasien` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rekam_medis_ibfk_2` FOREIGN KEY (`dokter_id`) REFERENCES `dokter` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
