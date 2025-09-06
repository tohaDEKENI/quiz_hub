CREATE TABLE IF NOT EXISTS `quiz` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    description TEXT,
    data TEXT,
    visibility VARCHAR(30),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    langue VARCHAR(50),
    tags TEXT,
    vues INT DEFAULT 0,
    user_id VARCHAR(40),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS `comments` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    user_id VARCHAR(40),
    quiz_id VARCHAR(40),
    user_name VARCHAR(100),
    likes INT ,
    user_image TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (quiz_id) REFERENCES quiz(id),
);

CREATE TABLE IF NOT EXISTS `chaine` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,          
    description TEXT,                           
    image TEXT,                                 
    visibility ENUM('public', 'private') DEFAULT 'public',  
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id VARCHAR(40) NOT NULL UNIQUE,       
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
