# Updating state from Laravel -> Jutsu

As Jutsu will only take care of the realtime information relating to the bid, most of the administrative actions like creating auctions and lots, updating them, etc. will take place in Laravel. This means all the data in Laravel that is relevant for the realtime service has to be mirrored to Jutsu.

For this, we will use server-to-server communication to make a call to jutsu whenever such a change happens.

## Auctions and Lots

Whenever in Laravel and Auction or a Lot is updated, a call should be made to Jutsu to send the new information.

## Bids

Bids will be placed directly by users on the Jutsu API endpoints, so Laravel won't be involved in bids.

## Users

Authentication will be managed by Laravel, so a mechanism must be implemented where for example jutsu can validate auth tokens on the request. A more secure method would be to sign important requests like bids with a private key that is verified to belong to the user by Laravel.

### Updating user in jutsu

- user ID
- permissions (per child site)
- auth token (both when it becomes active and when it becomes invalid)

# Sending data Jutsu -> Laravel

In some cases, the Laravel application may need information about the realtime service. For such cases, Jutsu should also expose an API where such information can be queried internally.

# Sending events Jutsu -> Laravel

Sometimes it is necessary to trigger an action on Laravel from Jutsu. For example, when a bid is placed, Laravel should be informed, so that an email can be sent out if necessary.

The easiest way to do this will be for Laravel to expose gRPC functions that can be used to trigger these events. But also Laravel's redis instance may be used to place events in a queue.

# Sending data Jutsu -> User

Jutsu will expose information using a Websocket API. This can be used both to query one-time information (like REST), and realtime information.

## Permissions

On "visible" lots, all bids with time, amount, country of bidder and lot will be public.

The user who placed the bid will require extra permissions to query (how should we define permissions between Laravel and jutsu?)

For example:
- Admin of the child site can see user of all bids
- Any user can see if they placed a bid themselves

### Example permission definition for user

- site:${site_id}:place_bid
- site:${site_id}:admin