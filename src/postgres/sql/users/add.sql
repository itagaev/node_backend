insert into users (first_name, last_name, email, role, password) values (${firstName}, ${lastName}, ${email}, ${role}, ${password}) returning id, email, role;