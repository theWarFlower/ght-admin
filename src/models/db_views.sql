-- Define Views
CREATE OR REPLACE VIEW v_requests AS
SELECT
    Requests.request_id,
    Requests.customer_id,
    Requests.user_id,
    Requests.description,
    Requests.status_id,
    Requests.location,
    Requests.created_at,
    Requests.updated_at,
    Customers.first_name,
    Customers.last_name,
    Request_Types.type_name,
    Request_Status.status_name,
    Request_Status.description AS status_description
FROM Requests
JOIN Customers ON Requests.customer_id = Customers.customer_id
JOIN Request_Types ON Requests.request_id = Request_Types.request_id
JOIN Request_Status ON Requests.status_id = Request_Status.status_id;

CREATE OR REPLACE VIEW v_comments AS
SELECT
    Comments.comment_id,
    Comments.request_id,
    Comments.user_id,
    Comments.comment_text,
    Comments.created_at,
    Users.first_name,
    Users.last_name
FROM Comments
JOIN Users ON Comments.user_id = Users.user_id;