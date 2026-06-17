def render_map():
    return '''
  <main style={{ padding: 30 }}>

    <h2 style={{ marginTop: 40 }}>
      South Africa LPG Depots
    </h2>

    <div style={{ display: "grid", gap: 12 }}>

      {map && map.length > 0 ? (
        map.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              borderRadius: 10,
              background:
                item.status === "red"
                  ? "#ffe5e5"
                  : item.status === "yellow"
                  ? "#fff7d6"
                  : "#e6ffe6"
            }}
          >
            <h3>{item.name}</h3>
            <p>Province: {item.province}</p>
            <p>Stock Level: {item.stock}</p>
            <p>Status: {item.status.toUpperCase()}</p>
          </div>
        ))
      ) : (
        <p>Loading depots...</p>
      )}

    </div>

  </main>
'''