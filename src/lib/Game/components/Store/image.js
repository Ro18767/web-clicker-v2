import hero_click_0 from "./../../image/hero/hero.click.0.png?url";
import hero_dps_0 from "./../../image/hero/hero.dps.0.png?url";
import hero_dps_1 from "./../../image/hero/hero.dps.1.png?url";
import hero_dps_2 from "./../../image/hero/hero.dps.2.png?url";
/**
 * @param {string} code
 * @returns {string}
 */
export function getImageHero(code) {
  if (code === 'hero.dps.0') return hero_dps_0;
  if (code === 'hero.dps.1') return hero_dps_1;
  if (code === 'hero.dps.2') return hero_dps_2;

  return hero_click_0;
}
