/* Referrals4Coaches — shared demo data + link resolver.
 *
 * No backend. Coach + referrer are resolved from the URL query string so the
 * same static pages work for any coach/friend pair:
 *
 *   referral.html?coach=<slug>&from=<friend>   ← what a friend opens
 *   profile.html?coach=<slug>&from=<friend>    ← what the scanned QR points to
 *
 * With no params, everything falls back to the demo coach below. To add a real
 * coach, drop another entry in COACHES and hand each ally their referral link.
 */
(function () {
  var COACHES = {
    daniel: {
      name: "Daniel Mercer",
      title: "Leadership & executive coach",
      location: "San Francisco",
      photos: ["images/paul.webp", "images/garden-party.webp", "images/rooftop.webp"],
      avatar: "images/paul.webp",
      bio:
        "I help founders and senior leaders get unstuck — the kind of stuck that " +
        "doesn't show up on a roadmap. Fifteen years coaching execs through scaling " +
        "teams, hard conversations, and the jump from doing the work to leading the " +
        "people who do it. Sessions are direct, a little uncomfortable in the good " +
        "way, and built around whatever you're actually wrestling with this week.",
      friends: {
        julie: {
          name: "Julie",
          rel: "Daniel's friend & former client",
          avatar: "images/julie.webp",
          endorsement:
            "I worked with Daniel through the messiest stretch of my company's " +
            "growth. He's the rare coach who actually changes how you think — not " +
            "with frameworks, but by asking the one question you've been avoiding. " +
            "If you lead people, talk to him."
        }
      }
    }
  };

  var DEFAULT_COACH = "daniel";
  var DEFAULT_FRIEND = "julie";

  function params() {
    try {
      return new URLSearchParams(window.location.search);
    } catch (e) {
      return new URLSearchParams("");
    }
  }

  function resolve() {
    var p = params();
    var coachSlug = (p.get("coach") || DEFAULT_COACH).toLowerCase();
    var fromSlug = (p.get("from") || DEFAULT_FRIEND).toLowerCase();

    var coach = COACHES[coachSlug] || COACHES[DEFAULT_COACH];
    var friends = coach.friends || {};
    var friend = friends[fromSlug] || friends[DEFAULT_FRIEND] || Object.values(friends)[0] || null;

    // Carry the resolved slugs forward so referral → profile keeps context.
    var query = "?coach=" + encodeURIComponent(coachSlug) + "&from=" + encodeURIComponent(fromSlug);

    // Absolute URLs relative to the current page — works on localhost and on
    // GitHub Pages with no hardcoded domain. This is what the QR encodes.
    var profileUrl = new URL("profile.html" + query, window.location.href).href;
    var referralUrl = new URL("referral.html" + query, window.location.href).href;

    return {
      coachSlug: coachSlug,
      fromSlug: fromSlug,
      coach: coach,
      friend: friend,
      query: query,
      profileUrl: profileUrl,
      referralUrl: referralUrl
    };
  }

  window.R4C = { COACHES: COACHES, resolve: resolve };
})();
