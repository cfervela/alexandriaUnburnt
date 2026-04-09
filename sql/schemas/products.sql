-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2026 at 08:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alexandria`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `isbn` varchar(13) NOT NULL,
  `title` varchar(50) NOT NULL,
  `author` varchar(50) DEFAULT NULL,
  `genre` varchar(50) NOT NULL,
  `publisher` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`isbn`, `title`, `author`, `genre`, `publisher`, `price`, `stock`, `image`, `description`) VALUES
('9780007559220', 'Solitaire', 'Alice Oseman', 'YA', 'Scholastic Press', 339.94, 5, 'https://covers.openlibrary.org/b/isbn/9780007559220-L.jpg', 'My name is Tori Spring. I like to sleep, blog, and until last year, I had friends. Before what happened with Charlie, before trying to get into college and having to talk to people. Things were different then. But not anymore. Now there\'s Lonely. And Michael Holden. I don\'t know what Lonely\'s point is. And I swear nothing could matter less to me than Michael Holden. Really. In case you\'re wondering, this isn\'t a love story. You already know Nick and Charlie. Now it\'s Tori\'s turn.'),
('9780008501853', 'Babel', 'R. F. Kuang', 'Fantasy', 'Harper', 490.05, 2, 'https://covers.openlibrary.org/b/isbn/9780008501853-L.jpg', '\"Translator, traitor: To translate will always be a betrayal.\n\n1828. Robin Swift, orphaned by cholera in Canton, is taken to London by the mysterious Professor Lovell. There he trains for years in Latin, Ancient Greek, and Chinese, all in preparation for the day he enrolls at Oxford\'s translation school: Babel.\"'),
('9780060837020', 'The Bell Jar', 'Sylvia Plath', 'Classic', 'Harperperennial', 249, 5, 'https://covers.openlibrary.org/b/isbn/9780060837020-L.jpg', 'Working as an intern at a New York fashion magazine in the summer of 1953, Esther Greenwood is on the cusp of her future. But she is also on the edge of a darkness that makes her world increasingly surreal. Esther\'s perspective flickers and fluctuates, everything leaves her bewildered. The Bell Jar was Plath\'s only novel.'),
('9780140449174', 'Anna Karenina', 'Leo Tolstoy', 'Classic', 'Penguin', 369, 11, 'https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg', 'Anna is a beautiful and intelligent woman whose passionate affair with the dashing Count Vronsky leads to her downfall. Contrasted with this tale of love and self-mutilation is the vividly observed story of Levin, a man searching for fulfillment and purpose in life. Lose yourself in Tolstoy\'s epic novel of love, destiny, and self-destruction.'),
('9780141197692', 'Persuasion', 'Jane Austen', 'Classic', 'Penguin', 379, 10, 'https://covers.openlibrary.org/b/isbn/9780141197692-L.jpg', 'At twenty-seven, Anne Elliot is no longer young and has few romantic prospects. Eight years earlier, she was persuaded to break off her engagement to Frederick Wentworth, a handsome naval captain with no resources or rank. What happens when they meet again? Persuasion is a brilliant satire of vanity and pretension, but above all, a story of lost love.'),
('9780141439471', 'Frankenstein', 'Mary Shelly', 'Classic', 'Penguin', 204, 6, 'https://covers.openlibrary.org/b/isbn/9780141439471-L.jpg', 'Obsessed with the power to create life itself, Victor Frankenstein plunders graves to obtain the materials necessary to create a new being. This flawed creature, rejected by Frankenstein and denied human companionship, sets out to destroy his creator and everything he cherishes. Shelly conceived this harrowing story when she was eighteen.'),
('9780141439518', 'Pride and Prejudice', 'Jane Austen', 'Classic', 'Penguin', 349.6, 10, 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', 'The first time Elizabeth Bennet meets the eligible bachelor Fitzwilliam Darcy, she dismisses him as arrogant and conceited; at the same time, the gentleman remains indifferent to Miss Bennet\'s beauty and lively mind. When Elizabeth learns that Mr. Darcy has interfered in the relationship between her sister Jane and Mr. Bingley, her indifference turns to disgust. Austen develops a comedy of errors that demonstrates how wrong it is to rely on first impressions.'),
('9780143034698', 'The Coming of the Third Reich', 'Richard J. Evans', 'History', 'Penguin', 522.55, 3, 'https://covers.openlibrary.org/b/isbn/9780143034698-L.jpg', 'A masterful synthesis of a vast body of scholarly work integrated with important new research and interpretations, Evans’s history restores drama and contingency to the rise to power of Hitler and the Nazis, even as it shows how ready Germany was by the early 1930s for such a takeover to occur. '),
('9780143105435', 'Wuthering Heights', 'Emily Brontë', 'Classic', 'Penguin', 419, 2, 'https://covers.openlibrary.org/b/isbn/9780143105435-L.jpg', 'Wuthering Heights is the story of two families bound together and torn apart by love and hate. Cathy is a beautiful and headstrong young woman torn between her indulgent husband and Heathcliff, the passionate and spiteful man who has loved her since childhood. The power of their bond creates a storm of cruelty and violence that will leave one dead and the other a shadow over the lives of their children.'),
('9780545229937', 'The Hunger Games', 'Suzanne Collins', 'YA', 'Scholastic Press', 330, 2, 'https://covers.openlibrary.org/b/isbn/9780545229937-L.jpg', 'In the ruins of what was once North America now lies the country of Panem, a glittering Capitol surrounded by twelve districts. The Capitol is hostile and cruel, keeping the districts in check by forcing them to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a live fight to the death.'),
('9780593168202', 'Normal People', 'Sally rooney', 'Contemporary', 'Crown', 431.59, 3, 'https://covers.openlibrary.org/b/isbn/9780593168202-L.jpg', 'Marianne and Connell are classmates in high school, but they never speak to each other. He\'s one of the popular kids, and she\'s a loner who\'s learned to keep her distance from everyone else. Everyone knows Marianne lives in a mansion and that Connell\'s mother cleans it, but no one suspects that the two young people run into each other every afternoon. One of those days, an awkward conversation sparks a relationship that could change their lives.'),
('9780593595718', 'Ready or Not', 'Cara Bastone', 'Romance', 'The Dial Press', 287.48, 1, 'https://covers.openlibrary.org/b/isbn/9780593595718-L.jpg', 'Eve Hatch lives for surprises! Well, not really. She already knows what\'s going to happen every day, and she knows that each one will look pretty much the same. She loves her cozy Brooklyn apartment, close to her childhood best friend Willa, and far from her traditional family who never really understood her. Even though her job is just adjacent to her dream, it\'s comfortable and steady. She always knows what\'s supposed to happen in her life…until she hits a roadblock.'),
('9780786282258', 'The Lightning Thief', 'Rick Riordan', 'YA', 'Disney Hyperion', 242.94, 1, 'https://covers.openlibrary.org/b/isbn/9780786282258-L.jpg', 'Percy Jackson is about to be expelled from school…again. And that\'s the least of it; lately, mythological monsters and the gods of Mount Olympus seem to be stepping straight out of Percy\'s history book. The worst part is that he seems to have angered some of them. Zeus\'s lightning bolt has been stolen, and Percy is the prime suspect. Now Percy has only ten days to find it and replace it.'),
('9781250076960', 'Six of Crows', 'Leigh Bardugo', 'YA', 'Henry Holt & Company', 240, 4, 'https://covers.openlibrary.org/b/isbn/9781250076960-L.jpg', 'Ketterdam is an international trading hub where anything can be bought for the right price, and no one knows this better than Kaz Brekker. Kaz is presented with the opportunity for a deadly heist that will make him richer than he ever imagined. But he can\'t pull it off alone, so Kaz assembles a team of six dangerous outcasts.'),
('9781410446077', 'Cinder', 'Marissa Meyer', 'YA', 'Square Fish', 242, 19, 'https://covers.openlibrary.org/b/isbn/9781410446077-L.jpg', 'Cinder, a talented mechanic in New Beijing, is also a cyborg. She is abused by her stepmother and blamed for her stepsister\'s sudden illness. But when her life becomes intertwined with the handsome Prince Kai, she finds herself at the center of a violent struggle between the desires of an evil queen and a dangerous temptation.'),
('9798885785365', 'Book Lovers', 'Emily Henry', 'Romance', 'BookLovers', 418, 10, 'https://covers.openlibrary.org/b/isbn/9798885785365-L.jpg', 'Nora Stephens’ life is books—she’s read them all—and she is not that type of heroine. Not the plucky one, not the laidback dream girl, and especially not the sweetheart. In fact, the only people Nora is a heroine for are her clients, for whom she lands enormous deals as a cutthroat literary agent, and her beloved little sister Libby. \r\n\r\nIf Nora knows she’s not an ideal heroine, Charlie knows he’s nobody’s hero, but as they are thrown together again and again—in a series of coincidences no editor worth their salt would allow—what they discover might just unravel the carefully crafted stories they’ve written about themselves.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`isbn`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
