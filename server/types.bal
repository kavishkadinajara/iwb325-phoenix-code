type Event record {
    string id;
    string name;
    string date;
    string time;
    string location;
    int tickets_sold;
    string image;
    boolean default;
    int available_tickets;
    float ticket_price;
    string slug;
    boolean meal_provides;
    string description;
    int status;
};

type TicketDetails record {
    string ticket_name;
    string email;
    int payment_method;
    int status;
    string event_id;
    string event_name;
    string event_date;
    string event_time;
    float ticket_price;
};

type Ticket record {
    string id;
    string name;
    string email;
    string mobile;
    int attendance;
    string arrival;
    int lunch;
    int refreshments;
    int payment_method;
    int status;
    string event_name;
};

type PaymentMethod record {
    int method;
    int count;
};

type EventDashboard record {
    string event_name;
    string event_date;
    float ticket_price;
    int total_ticket_sales;
    int total_paid_tickets;
    int total_unpaid_tickets;
    int total_refunded_tickets;
    float total_revenue;
    int attended_people;
    int tickets_sold;
    int tickets_available;
    json? tickets_by_day;
    PaymentMethod[] payment_methods;
};