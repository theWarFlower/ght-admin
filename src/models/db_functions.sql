-- Define Triggers to update updated_at column
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_before_update
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER requests_before_update
BEFORE UPDATE ON requests
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER comments_before_update
BEFORE UPDATE ON comments
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Define Ingest Functions
CREATE OR REPLACE FUNCTION replicate_ingest_data()
RETURNS TRIGGER AS $$
DECLARE
    new_customer_id INT;
    new_request_id INT;
    new_request_type_id INT;
BEGIN
    -- Check if the email already exists in the Customers table
    SELECT customer_id INTO new_customer_id FROM Customers WHERE email = NEW.email LIMIT 1;

    IF NOT FOUND THEN
        -- If not found, insert the client as a new customer and capture the customer_id
            -- Splitting name into first_name and last_name for simplicity

    INSERT INTO Customers (first_name, last_name, email, phone, city, state, zipcode, address1, address2, created_at) VALUES (
        split_part(NEW.name, ' ', 1), -- Assuming first word as first name
        split_part(NEW.name, ' ', 2), -- Assuming rest as last name
        NEW.email,
        NEW.mobile,
        '',
        '',
        '',
        '',
        '',
        NEW.created_at
    )
    RETURNING customer_id INTO new_customer_id;
    END IF;
    /*
    SELECT REQUEST_ID INTO NEW_REQUEST_ID FROM REQUESTS WHERE REQUEST_ID = NEW.REQUEST_ID LIMIT 1;
    -- If found, update the customer_id in the Requests table
    UPDATE Requests SET customer_id = new_customer_id WHERE request_id = NEW.request_id;
    Insert the request
    */
    INSERT INTO Requests (customer_id, description, status_id, location) VALUES (
        new_customer_id,
        NEW.description,
        (SELECT status_id FROM Request_Status WHERE status_name = NEW.status LIMIT 1),
        -- Assuming status_id and location_id are already mapped to their respective IDs in the Request_Status and Locations tables, respectively.
        (SELECT location_id FROM Locations WHERE location_name = NEW.location LIMIT 1)
    )
        -- Assuming location_name is already mapped to its corresponding ID in the Locations table.
    RETURNING request_id INTO new_request_id;

    -- Insert the request type (assuming request_type contains the type_name)

    SELECT request_type_id INTO new_request_type_id FROM Request_Types WHERE type_name = NEW.support_type LIMIT 1;
    IF FOUND THEN
        INSERT INTO Request_Support_Types (request_id, request_type_id) VALUES (new_request_id, new_request_type_id);
    END IF;

    -- Insert comments if any (considering remarks column in ingest_table corresponds to request comments)
    IF NEW.remarks IS NOT NULL THEN
        INSERT INTO Comments (request_id, comment_text) VALUES (new_request_id, NEW.remarks);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ingest Table Trigger
CREATE TRIGGER ingest_data_trigger
AFTER INSERT ON ingest_table
FOR EACH ROW EXECUTE PROCEDURE replicate_ingest_data();

INSERT INTO ingest_requests (id, name, mobile, email, description, location, support_type, status, created_at, updated_at, remarks) VALUES
(143, 'Pam Kennedy', '6784284750', 'pam.kennedy@gmail.com', 'Head phone don’t work on the master bed  I spend 45 minutes \ntrying to fix it (raf)', 'Atlanta', 'A/V Automation', 'COMPLETED', '2023-12-29 12:25:01', '2024-02-27 15:11:13', NULL),
(144, 'Daryl Yokley', '4044342527', 'dvy@yokelylaw.com', 'Need to get Kevin back to install mrf350 power supply to wrap up install. \n\nNeal', 'Atlanta', 'A/V Automation', 'COMPLETED', '2023-12-29 12:29:45', '2024-01-04 13:40:02', NULL),
(145, 'Chris Early', '6783735594', 'cearly@ghtgroup.com', 'Test', 'Atlanta', 'Lighting Control', 'COMPLETED', '2023-12-29 14:00:49', '2023-12-29 14:22:45', NULL),
(146, 'Brian Beckham', '4044068355', 'brianleebeckham@icloud.com', 'the remote controls for the tvs - living room, barn, game room, theater, master bedroom all still have the old hbo max - and need to be updated to the new Max app instead … the hbo max app does not work with the new app/service', 'Atlanta', 'A/V Automation', 'COMPLETED', '2023-12-29 14:59:54', '2024-01-04 13:42:03', NULL),
(147, 'Ensley Darnall', '2054826079', 'darnallensley@gmail.com', 'By RC; Client has issue with WiFi speeds please schedule next week.', 'Birmingham', 'Network/Wi-Fi', 'COMPLETED', '2023-12-29 15:39:29', '2024-01-02 22:37:43', NULL),
(148, 'Tracy and Allen Merrill', '4045362504', 'allan.merrill@gmail.com', 'Hi Sean. Do you happen to know when someone will be able to go fix the gate? \nAlso, we have another issue that Im hoping you could help with. Apparently, under our kitchen sink, the power box where the instant hot water and garbage disposal plug in was installed incorrectly on the base of the cabinet rather than the side of the cabinet which became a dangerous issue last week when we had a leak and water got into the box. Do you think an electrician could get there today , tmw or early next ?', 'Atlanta', 'Electrical,A/V Automation', 'COMPLETED', '2023-12-29 15:58:44', '2024-01-02 20:05:15', NULL),
(149, 'dougcleveand', '7066548052', 'ddsdiveski@gmail.com', 'C4 not working requests online support', 'Atlanta', 'A/V Automation', 'COMPLETED', '2023-12-29 19:27:46', '2023-12-29 20:31:07', NULL),
(150, 'Susan Callaway', '4042294070', 'susancallaway@me.com', 'Need to bring Sonos Port to fix one audio zone, determine if downstairs tv will work upstairs, set up new Roku, and help eliminate Xfinity for her to return to store', 'Atlanta', 'A/V Automation', 'COMPLETED', '2023-12-29 20:21:56', '2024-01-08 20:11:34', NULL),
(151, 'Paul McCrensky', '561-777-2826', 'bpmack3@bellsouth.net', 'I am a customer with an issue with my Remote. The battery is full and I can change the volume but I can\'t use none of the other features\nRemote is Control4\'.     (EJ from website)', 'Atlanta', 'A/V Automation', 'COMPLETED', '2023-12-30 16:13:55', '2024-01-02 13:56:03', NULL),
