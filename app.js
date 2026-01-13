const data = {
  datasets: [
    {
      title: "Dataset Sample",
      meta: "SR 16kHz | SNR 10 dB | retain: sea_waves (50%) | nonretained: camera_shutter",
      items: [
        { label: "clean", src: "datasets/original/00000003.wav" },
        { label: "input", src: "datasets/Input/00000003.wav" },
        { label: "label", src: "datasets/Label/00000003.wav" }
      ],
      json: "datasets/metadata/00000003.json"
    },
    {
      title: "Dataset Sample",
      meta: "SR 16kHz | SNR 5 dB | retain: siren (25%) | nonretained: thunderstorm",
      items: [
        { label: "clean", src: "datasets/original/00000060.wav" },
        { label: "input", src: "datasets/Input/00000060.wav" },
        { label: "label", src: "datasets/Label/00000060.wav" }
      ],
      json: "datasets/metadata/00000060.json"
    }
  ],
  eventSounds: [
    {
      title: "train",
      src: "event_sound/train/demo.wav"
    },
    {
      title: "siren",
      src: "event_sound/siren/demo.wav"
    },
    {
      title: "car_horn",
      src: "event_sound/car_horn/demo.wav"
    }
  ],
  demos: [
    {
      id: "SNR 0 dB",
      meta: "SR 16kHz | SNR 0 dB | retain: engine (100%) | nonretained: siren, bell",
      items: [
        { label: "noisy", src: "demo/snr0_noisy.wav" },
        { label: "est", src: "demo/snr0_est.wav" },
        { label: "target", src: "demo/snr0_target.wav" }
      ],
      json: "demo/snr0.json"
    },
    {
      id: "SNR 5 dB",
      meta: "SR 16kHz | SNR 5 dB | retain: frog (75%) | nonretained: door_knocking",
      items: [
        { label: "noisy", src: "demo/snr5_noisy.wav" },
        { label: "est", src: "demo/snr5_est.wav" },
        { label: "target", src: "demo/snr5_target.wav" }
      ],
      json: "demo/snr5.json"
    },
    {
      id: "SNR 10 dB",
      meta: "SR 16kHz | SNR 10 dB | retain: camera_shutter (100%) | nonretained: dog, crow",
      items: [
        { label: "noisy", src: "demo/snr10_noisy.wav" },
        { label: "est", src: "demo/snr10_est.wav" },
        { label: "target", src: "demo/snr10_target.wav" }
      ],
      json: "demo/snr10.json"
    },
    {
      id: "SNR 15 dB",
      meta: "SR 16kHz | SNR 15 dB | retain: cat (25%) | nonretained: pouring_water, snoring",
      items: [
        { label: "noisy", src: "demo/snr15_noisy.wav" },
        { label: "est", src: "demo/snr15_est.wav" },
        { label: "target", src: "demo/snr15_target.wav" }
      ],
      json: "demo/snr15.json"
    }
  ]
};

const datasetsGrid = document.getElementById("datasets-grid");
const eventGrid = document.getElementById("event-grid");
const demoGrid = document.getElementById("demo-grid");

const createAudioRow = (label, src) => {
  const wrapper = document.createElement("div");
  wrapper.className = "audio-row";

  const tag = document.createElement("span");
  tag.className = "audio-label";
  tag.textContent = label;

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = src;

  wrapper.append(tag, audio);
  return wrapper;
};

const createCard = ({ title, meta, items, json, badge }) => {
  const card = document.createElement("article");
  card.className = "card";
  card.style.animationDelay = `${Math.random() * 0.2}s`;

  const heading = document.createElement("h3");
  heading.textContent = title;

  if (badge) {
    const pill = document.createElement("span");
    pill.className = "tag";
    pill.textContent = badge;
    card.appendChild(pill);
  }

  card.appendChild(heading);

  if (meta) {
    const metaText = document.createElement("p");
    metaText.className = "meta";
    metaText.textContent = meta;
    card.appendChild(metaText);
  }

  items.forEach((item) => card.appendChild(createAudioRow(item.label, item.src)));

  if (json) {
    const link = document.createElement("a");
    link.className = "link";
    link.href = json;
    link.textContent = "View JSON";
    link.target = "_blank";
    card.appendChild(link);
  }

  return card;
};

const renderDatasets = () => {
  data.datasets.forEach((entry) => {
    datasetsGrid.appendChild(
      createCard({
        title: entry.title,
        meta: entry.meta,
        items: entry.items,
        json: entry.json,
        badge: "dataset"
      })
    );
  });
};

const renderEvents = () => {
  data.eventSounds.forEach((entry) => {
    eventGrid.appendChild(
      createCard({
        title: entry.title,
        meta: "AudioX generated event sound",
        items: [{ label: "audio", src: entry.src }],
        badge: "event_sound"
      })
    );
  });
};

const renderDemos = () => {
  data.demos.forEach((entry) => {
    demoGrid.appendChild(
      createCard({
        title: `Demo ${entry.id}`,
        meta: entry.meta,
        items: entry.items,
        json: entry.json,
        badge: "denoise"
      })
    );
  });
};

renderDatasets();
renderEvents();
renderDemos();
