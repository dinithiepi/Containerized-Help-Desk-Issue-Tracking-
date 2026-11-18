CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'open',
  submitted_by VARCHAR(100),
  category VARCHAR(100) DEFAULT 'Other',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO tickets (title, description, priority, submitted_by, category) VALUES
('Cannot connect to university Wi-Fi', 'Getting authentication error since this morning in the library building', 'high', 'Kasun Fernando', 'Wi-Fi / Network'),
('Projector not working in Lab 3', 'The projector shows no signal when connected to laptop', 'medium', 'Mary Perera', 'Computer / Hardware'),
('Need Microsoft Office installed', 'Request for MS Office on the new lab computers', 'low', 'Dinith Silva', 'Software / Apps');