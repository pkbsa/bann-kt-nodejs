-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 11:09 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bann-kt`
--

-- --------------------------------------------------------

--
-- Table structure for table `catlist`
--

CREATE TABLE `catlist` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` varchar(30) NOT NULL,
  `color` varchar(20) NOT NULL,
  `price` varchar(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `catlist`
--

INSERT INTO `catlist` (`id`, `name`, `image`, `gender`, `age`, `color`, `price`, `status`) VALUES
(13, 'British Short Hair', '290743800_591536999212016_592022761160925615_n.jpg', 'male', '24 June 2021', 'lilac (c)', '50,000', 1),
(14, 'British Short Hair', 'cat2.png', 'male', '25 June 2021', 'lilac (c)', '-', 1),
(15, 'British Short Hair', 'cat3.png', 'female', '5 Months', 'w61', '-', 0),
(16, 'British Long Hair', 'cat4.png', 'female', '12 Weeks', 'lilac (c)', '65,000', 0),
(33, 'British Short Hair', '150192677_862978257858210_2980609019445049152_n.jpg', 'male', '12 Weeks', 'ay11', '50000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image` varchar(500) NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`id`, `name`, `image`, `gender`) VALUES
(1, 'LV* Divalana Lord', 'sir-3.png', 'male'),
(2, 'D*Garibaldi\'s Jack Pot\r\n', 'sir-4.png', 'male'),
(3, 'Xenres Royal Edelweiss', 'sir-5.png', 'male'),
(4, 'Baron Beauty Factory\r\n', 'sir-7.png', 'male'),
(5, 'Gentle Plush Chester', 'sir-8.png', 'male'),
(6, 'Nikonor Silver Heat\r\n', 'sir-9.png', 'male'),
(7, 'Junior Champion Neolit Silver Neo', 'sir-10.png', 'male'),
(8, 'female1', 'nopicture.png', 'female'),
(9, 'female2', 'nopicture.png', 'female'),
(10, 'female3', 'nopicture.png', 'female');

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `id` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`id`, `title`, `text`, `image`) VALUES
(1, 'กรุ๊ปเลือดแมว', 'แมวมี 3 กรุ๊ปเลือด A, AB และ B \r\n\r\nการตรวจกรุ๊ปเลือดแมวสำคัญมาก การที่พ่อและและแม่แมวมีกรุ๊ปเลือดต่างกันแล้วนำมาผสมพันธ์กัน ลูกที่เกิดมาบางตัวหากทานนมของแม่ภายใน 24 ชั่วโมง อาจเสียชีวิตได้จากภาวะเซลล์เม็ดเลือดแดงแตก (Neonatal Isoerythrolysis) \r\n\r\nการตรวจกรุ๊ปเลือดแมวปัจจุบันสามารถตรวจได้แล้วในโรงพยาบาลสัตว์หลายๆ ที่\r\n\r\nกรณีที่ตรวจแล้วพบว่าแม่แมวมีเลือดกรุ๊ป B และพ่อแมวมีกรุ๊ปเลือด A หรือ AB ทางเจ้าของต้องแยกลูกแมวออกจากแม่แมวก่อนอย่างต่ำ 24 ชั่วโมง (ทาง Bann K&T แยกลูกแมว 36 ชั่วโมง) โดยระหว่างนั้นให้หานมสำหรับลูกแมวหรือนมแพะมาให้ลูกแมวทาน \r\n\r\nข้อดีของการตรวจกรุ๊ปเลือดแมว\r\n1 ลดการเสียชีวิตของแมวน้อยจากภาวะเซลล์เม็ดเลือดแดงแตก\r\n2 หากแมวเกิดอุบัติเหตุหรือมีความจำเป็นที่จะต้องได้รับการบริจาคเลือดโดยด่วน การรู้กรุ๊ปเลือดแมวก่อนอาจสามารถลดเวลาและค่าใช้จ่ายได้', 'slide-5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `userlist`
--

CREATE TABLE `userlist` (
  `id` int(11) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlist`
--

INSERT INTO `userlist` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin'),
(2, 'tae208', 'Sandee208');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catlist`
--
ALTER TABLE `catlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userlist`
--
ALTER TABLE `userlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catlist`
--
ALTER TABLE `catlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `userlist`
--
ALTER TABLE `userlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
