CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'open',
  submitted_by VARCHAR(100),
  student_id VARCHAR(20),
  category VARCHAR(100) DEFAULT 'Other',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO tickets (title, description, priority, submitted_by, student_id, category) VALUES
('Cannot connect to university Wi-Fi', 'Getting authentication error in Engineering Faculty library', 'high', 'Kasun Fernando', 'E/19/150', 'Wi-Fi / Network'),
('Projector not working in Lab 3', 'No signal when connected via HDMI', 'medium', 'Mary Perera', 'E/20/089', 'Projector / AV'),
('Need Microsoft Office on new lab PC', 'Lab 5 computers missing Office suite', 'low', 'Dinith Silva', 'E/21/234', 'Software / Apps');