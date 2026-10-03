import React from 'react';

export default function Manifesto() {
  return (
    <section id="story" class="manifesto" data-kind="manifesto">
      <div class="wrap">
        <svg class="star mf-star" viewBox="0 0 100 100" aria-hidden="true" data-spin>
          <path d="M50 0C51 39 61 49 100 50C61 51 51 61 50 100C49 61 39 51 0 50C39 49 49 39 50 0Z" />
        </svg>

        <p class="mf-text" data-stretch>
          Người ta đến Đà Lạt không phải để tìm những ồn ào vội vã, mà để <strong>tìm lại sự bình yên mộc mạc vốn có trong lòng.</strong> Dù bạn cầm lái chiếc xe máy luồn lách qua từng khúc cua dốc thông hay thảnh thơi cùng gia đình trên xe ô tô, xứ sở mộng mơ này luôn đón bạn bằng cái ôm dịu dàng và ấm áp nhất.
        </p>

        <div class="mf-foot" data-rule>
          <p class="mf-sign">Cộng Đồng Ghiền Đà Lạt — Tiếp lửa những bước chân xê dịch</p>
          <dl class="spec" data-reveal>
            <div><dt>Tọa độ gợi ý</dt><dd>120+ Điểm check-in &amp; quán ruột</dd></div>
            <div><dt>Phương tiện</dt><dd>Xe máy phượt &amp; Ô tô gia đình</dd></div>
            <div><dt>Thông điệp</dt><dd>Yêu Đà Lạt, giữ sạch rừng thông</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
