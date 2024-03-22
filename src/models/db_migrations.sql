
/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


CREATE OR REPLACE FUNCTION replicate_ingest_data()
RETURNS TRIGGER AS $$
DECLARE
    cust_id INT;
    req_id INT;
    type_id INT;
    status INTEGER;
BEGIN
    -- Splitting client_name into first_name and last_name for simplicity
    INSERT INTO Customers (first_name, last_name, email, phone, created_at, updated_at)
    VALUES (
        split_part(NEW.client_name, ' ', 1), -- Assuming first word as first name
        split_part(NEW.client_name, ' ', 2), -- Assuming rest as last name
        NEW.client_email,
        NEW.client_phone,
        NEW.created_at,
        CURRENT_TIMESTAMP
    )
    RETURNING id INTO cust_id;

    -- Convert or map request_type to type_id from Request_Types table (simplified logic)
    SELECT type_id INTO type_id FROM Request_Types WHERE type_name = NEW.request_type LIMIT 1;

    -- Convert or map status_id to status from Request_Status table (simplified logic)
    SELECT status_id INTO status FROM Request_Status WHERE status_name = NEW.status_id LIMIT 1;

    -- Insert into Requests table
    INSERT INTO Requests (customer_id, description, status_id, created_at, updated_at)
    VALUES (
        cust_id,
        NEW.description,
        status,
        NEW.created_at,
        CURRENT_TIMESTAMP
    )
    RETURNING request_id INTO req_id;

    -- Assuming comments are to be added to Comments table
    IF NEW.comments IS NOT NULL THEN
        INSERT INTO Comments (request_id, comment_text, created_at)
        VALUES (req_id, NEW.comments, NEW.created_at);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION replicate_ingest_data()
RETURNS TRIGGER AS $$
DECLARE
    new_customer_id INT;
    new_request_id INT;
    type_id INT;
BEGIN
    -- Check if the email already exists in the Customers table
    SELECT customer_id INTO new_customer_id FROM Customers WHERE email = NEW.client_email LIMIT 1;

    IF NOT FOUND THEN
        -- If not found, insert the client as a new customer and capture the customer_id
        INSERT INTO Customers (first_name, last_name, email, phone, location)
        VALUES (
            split_part(NEW.client_name, ' ', 1), -- Assuming first word as first name
            split_part(NEW.client_name, ' ', 2), -- Assuming rest as last name
            NEW.client_email, 
            NEW.client_phone, 
            NEW.location
            )
        RETURNING id INTO new_customer_id;
    END IF;

    -- Insert the request
    -- INSERT INTO Requests (customer_id, description, status_id, location)
    -- VALUES (new_customer_id, NEW.description, (SELECT status_id FROM Request_Status WHERE status_name = NEW.status_id LIMIT 1), (SELECT location_id FROM Locations WHERE location_name = NEW.location LIMIT 1))
    -- RETURNING request_id INTO new_request_id;

    -- Insert the request type (assuming request_type contains the type_name)
    SELECT type_id INTO type_id FROM Request_Types WHERE type_name = NEW.request_type LIMIT 1;
    IF FOUND THEN
        INSERT INTO Request_Support_Types (request_id, type_id) VALUES (new_request_id, type_id);
    END IF;

    -- Insert comments if any (considering comments column in ingest_table corresponds to request comments)
    IF NEW.comments IS NOT NULL THEN
        INSERT INTO Comments (request_id, user_id, comment_text) VALUES (new_request_id, new_customer_id, NEW.comments);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
