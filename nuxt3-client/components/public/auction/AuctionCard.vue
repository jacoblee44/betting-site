<template>
  <div class="shadow-md rounded min-w-[325px] max-w-full">
    <!-- HEADER -->
    <!-- TODO: REVIEW COLORS, SPACING -->
    <div class="flex flex-col bg-red-500 text-white px-4 space-y-4 py-4">
      <div class="flex justify-between">
        <!-- TODO: REVIEW IMAGE HEIGHT -->
        <img
          src="https://horse24-medias.s3.amazonaws.com/horse24/sites/64/WESTF_Logo_whithe.png"
          alt="company-logo"
          class="h-[25.95px]"
        />
        <!-- TODO: SPACING -->
        <span class="flex space-x-2">
          <span
            ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 17h2m0 0h10M7 17v-6a5 5 0 0 1 10 0v6m0 0h2M11.5 5.5V4a.5.5 0 0 1 1 0v1.5M13 20a1 1 0 1 1-2 0h2z"
              />
            </svg>
          </span>
          <span class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.437 7.912a2.5 2.5 0 1 0 4.127-2.824a2.5 2.5 0 0 0-4.127 2.824Zm0 0l-4.96 3.394m0 0a3 3 0 1 0 .236 2.979m-.237-2.98c.33.483.524 1.066.524 1.695c0 .46-.103.895-.288 1.285m0 0l4.528 2.145m0 0a2.5 2.5 0 1 0 4.52 2.141a2.5 2.5 0 0 0-4.52-2.142Z"
              />
            </svg>
          </span>
        </span>
      </div>

      <p class="truncate h3-bold">24. Online Fohlen - Auktion - Springen</p>
    </div>

    <!-- IMAGE -->
    <img src="/img/auction-img.jpg" alt="Auction image" />

    <!-- AUCTION DETAILS -->
    <!-- TODO: REVIEW SPACING -->
    <div class="flex flex-col py-4 space-y-4">
      <!-- AUCTION TYPE -->
      <!-- TODO: REVIEW SPACING -->
      <div class="px-4 flex">
        <!-- TODO: REVIEW COLORS, SPACING -->
        <span class="flex px-3 bg-[#EBEDEE] rounded-sm mr-2">
          <h4>ON</h4>
          <h4 class="text-primary-500">LINE</h4>
        </span>
        <span class="h5-bold">Youngster</span>
      </div>

      <!-- AUCTION SHORT DESCRIPTION -->
      <!-- TODO: REVIEW COLORS, SPACING -->
      <p class="px-4 h4-regular text-[#373737]">
        Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore ...
      </p>

      <!-- DIVIDER -->
      <!-- TODO: SPACING -->
      <div class="px-4">
        <hr />
      </div>

      <!-- AUCTION DATE -->
      <!-- TODO: SPACING -->
      <div class="px-4 flex justify-center">
        <div class="flex flex-col">
          <div class="inline-flex">
            <span class="h5-bold mr-1">Auction Starts</span>
            <span class="text-sm">(CET)</span>
          </div>
          <!-- TODO: REVIEW SPACING -->
          <div class="inline-flex space-x-2 items-center">
            <span class="h5-regular inline-flex items-center">May 21, 2021</span>
            <div class="border-l-2 overflow-hidden h-6"></div>
            <span class="inline-flex items-end">
              <span class="h1">14:42<span class="h5-regular font-normal ml-1">AM</span></span>
            </span>
          </div>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <!-- TODO: REVIEW SPACING -->
      <div class="grid grid-cols-2 px-4 gap-2">
        <!-- TODO: REVIEW COLORS, SPACING -->
        <button
          class="border border-[#373737] rounded-sm py-1 text-sm leading-6 tracking-0.42 font-bold"
        >
          Last News
        </button>
        <!-- TODO: REVIEW COLORS, SPACING -->
        <button
          class="border border-[#373737] rounded-sm py-1 text-sm leading-6 tracking-0.42 font-bold"
        >
          View 64 lots
        </button>
      </div>
    </div>
  </div>
</template>
