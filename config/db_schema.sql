-- Application Database Schema Initial Setup
-- Used to configure the database application

DROP TABLE IF EXISTS Tasks;

-- Create all the  tables needed
/* Tasks */

CREATE TABLE Tasks (
    ID SERIAL PRIMARY KEY NOT NULL,
    tasks VARVHAR(150) NOT NULL,
    status SMALLINT DEFAULT 0 -- status: 0 --> pending tasks, 1 --> completed tasks, -1 --> deleted tasks
);
