"use client";
import { Shell, Page, Card, Btn, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, SHOWS, useStore } from "../shared";

export default function Shows() {
  const [s, update] = useStore();

  function toggle(id) {
    update((st) => {
      st.watchlist = st.watchlist.includes(id)
        ? st.watchlist.filter((x) => x !== id)
        : [...st.watchlist, id];
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Shows and films" sub={`${s.watchlist.length} in your watchlist`}>
        <Card title="Catalogue" testId="catalogue">
          {SHOWS.map((show) => (
            <div key={show.id} className="ck-row" data-testid={`show-${show.id}`}>
              <span>
                <strong>{show.title}</strong>
                <div className="ck-muted">
                  {show.kind} · {show.seasons ? `${show.seasons} seasons` : `${show.minutes} min`} · {show.rating}
                </div>
              </span>
              <span>
                {s.watchlist.includes(show.id) && <Badge tone="ok" testId={`saved-${show.id}`}>In watchlist</Badge>}{" "}
                <Btn size="sm" variant="secondary" data-testid={`watchlist-${show.id}`} onClick={() => toggle(show.id)}>
                  {s.watchlist.includes(show.id) ? "Remove" : "Add to watchlist"}
                </Btn>
              </span>
            </div>
          ))}
        </Card>
        <Card title="Watchlist" testId="watchlist">
          {s.watchlist.length === 0 && <Empty>Nothing saved yet.</Empty>}
          {s.watchlist.map((id) => {
            const show = SHOWS.find((x) => x.id === id);
            return <Row key={id} label={show.title} value={show.kind} testId={`watchlist-${id}`} />;
          })}
        </Card>
      </Page>
    </Shell>
  );
}
