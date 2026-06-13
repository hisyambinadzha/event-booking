import { getEventById } from "../services/event-service";
import { getUserById } from "../services/user-service";

export const enrichAndSortBookings = async (bookingList) => {
        const enrichedBookings = await Promise.all(
            bookingList.map(async (booking) => {
                let eventData = null;
                let userData = null;

                try {
                    const eventRes = await getEventById(booking.eventId);
                    eventData = eventRes.response?.body.title;
                } catch (err) {
                    console.error("Error fetching event:", err);
                }

                try {
                    const userRes = await getUserById(booking.userId);
                    userData = userRes.response?.body.fullname;
                } catch (err) {
                    console.error("Error fetching user:", err);
                }

                return {
                    ...booking,
                    event: eventData,
                    user: userData,
                };
            })
        );

        // 🔽 Sort by bookingDate (descending) then fullname (ascending)
        enrichedBookings.sort((a, b) => {
            const dateA = new Date(a.bookingDate);
            const dateB = new Date(b.bookingDate);

            if (dateB - dateA !== 0) {
                return dateB - dateA; // newest first
            }

            const nameA = (a.user || "").toLowerCase();
            const nameB = (b.user || "").toLowerCase();
            return nameA.localeCompare(nameB);
        });

        return enrichedBookings;
    };
