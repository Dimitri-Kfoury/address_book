



CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `address` tinytext NOT NULL,
  `email` varchar(20) NOT NULL,
  `telephone_number` varchar(10) NOT NULL
)