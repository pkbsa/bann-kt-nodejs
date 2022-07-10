-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2022 at 01:32 PM
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
  `age` varchar(11) NOT NULL,
  `color` varchar(20) NOT NULL,
  `price` varchar(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `catlist`
--

INSERT INTO `catlist` (`id`, `name`, `image`, `gender`, `age`, `color`, `price`, `status`) VALUES
(13, 'British Short Hair', 'cat1.png', 'male', '12 Weeks', 'lilac (c)', '50,000', 1),
(14, 'British Short Hair', 'cat2.png', 'male', '12 Weeks', 'lilac (c)', '-', 0),
(15, 'British Short Hair', 'cat3.png', 'female', '5 Months', 'w61', '-', 0),
(16, 'British Short Hair', 'cat4.png', 'female', '12 Weeks', 'lilac (c)', '65,000', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `userlist`
--
ALTER TABLE `userlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
