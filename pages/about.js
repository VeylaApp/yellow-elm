import Layout from "../components/layout";

export default function AboutUs() {
  return (
    <Layout>
      <div className="w-[60%] mx-auto pt-6 text-black">
        <h1 className="text-4xl font-header text-center mb-4">About Yellow Elm Ministries</h1>

        <div className="text-black">
          <p className="text-lg font-inter leading-relaxed mb-[15px]">
            Yellow Elm Ministries was born from a deeply personal journey—a sacred response to life’s
            unravelings, rebirths, and the call to live more rooted in truth, healing, and divine feminine wisdom.
          </p>

          <p className="text-lg font-inter leading-relaxed mb-[15px]">
            We are a spiritually grounded, Earth-honoring, trauma-informed community committed to helping people
            reconnect with themselves, with spirit, and with one another. Our foundation rests on reverence—for the
            Earth, for the sacred feminine, and for the quiet power of personal transformation.
          </p>

          <p className="text-lg font-inter leading-relaxed mb-[15px]">
            This ministry was envisioned not as a place of hierarchy or performance, but as a <strong>circle</strong>—one where all
            are welcome, and where healing, truth-telling, and growth are tended gently. From the seed of one woman’s
            journey emerged a vision to reclaim sacred space for those who’ve long felt outside of traditional faith
            structures.
          </p>

          <div>
            <h2 className="text-2xl font-header mt-6 mb-2">Foundational Precepts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Earth Reverence:</strong> We honor the cycles of nature, the sacredness of land, and the importance of ecological balance.</li>
              <li><strong>Divine Feminine Restoration:</strong> We center divine feminine energy in our spiritual practice, healing work, and leadership structures.</li>
              <li><strong>Embodied Healing:</strong> Through meditation, ritual, trauma-informed care, and grounded spirituality, we support deep inner transformation.</li>
              <li><strong>Radical Inclusion:</strong> We welcome seekers from all backgrounds, especially those marginalized or harmed by institutional religion.</li>
              <li><strong>Community as Medicine:</strong> We believe healing happens in sacred community—through shared stories, mutual support, and collective intention.</li>
            </ul>
          </div>

          <p className="text-lg font-inter leading-relaxed mb-[15px]">
            Yellow Elm is still in its early season of growth. Our first gatherings are being planned for early 2026, with
            offerings that include spiritual education, trauma recovery, nature-based retreats, and sacred counseling.
          </p>

          <p className="text-lg font-inter leading-relaxed mb-[15px]">
            If you feel the stirring to be part of something ancient and yet just beginning—something holy, earthy, and real—we invite you to walk with us.
          </p>
        </div>

        {/* Horizontal Links */}
        <div className="flex justify-center gap-8 pt-10">
          <a
            href="/mission"
            className="text-purple-moon underline hover:text-gold-aura"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mission Statement
          </a>
          <span className="text-purple-moon">|</span>
          <a
            href="/Statement-of-Faith.pdf"
            className="text-purple-moon underline hover:text-gold-aura"
            target="_blank"
            rel="noopener noreferrer"
          >
            Statement of Faith
          </a>
        </div>
      </div>
    </Layout>
  );
}
