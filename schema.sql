DROP TABLE IF EXISTS members;
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL
);

INSERT INTO members (name, role) VALUES ('山田 太郎', '管理者');
INSERT INTO members (name, role) VALUES ('佐藤 花子', '一般会員');
