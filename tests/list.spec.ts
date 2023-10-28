import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.deployment || "http://127.0.0.1:3000");
});

test("should add an item", async ({ page }) => {
  const itemName = `item ${Math.random().toString().slice(2)}`;

  await page.getByRole("combobox", { name: "add item to list" }).fill(itemName);
  await page.getByRole("option", { name: itemName }).click();
  await page.getByRole("button", { name: "add item" }).click();

  await expect(
    page.getByRole("textbox", {
      name: `edit ${itemName} name`,
      exact: true,
    }),
  ).toHaveValue(itemName);

  await page.getByRole("button", { name: `delete ${itemName}` }).click();

  await expect(
    page.getByRole("textbox", {
      name: `edit ${itemName} name`,
      exact: true,
    }),
  ).toBeHidden();
});

test("should toggle item recurrence state", async ({ page }) => {
  await withNewItem(page, async (itemName) => {
    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemName} as recurring`,
        exact: true,
      }),
    ).not.toBeChecked();
    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemName} as non-recurring`,
        exact: true,
      }),
    ).toBeHidden();

    await page
      .getByRole("checkbox", {
        name: `set ${itemName} as recurring`,
        exact: true,
      })
      .check();

    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemName} as non-recurring`,
        exact: true,
      }),
    ).toBeChecked();
    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemName} as recurring`,
        exact: true,
      }),
    ).toBeHidden();

    await page
      .getByRole("checkbox", {
        name: `set ${itemName} as non-recurring`,
        exact: true,
      })
      .uncheck();

    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemName} as recurring`,
        exact: true,
      }),
    ).not.toBeChecked();
    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemName} as non-recurring`,
        exact: true,
      }),
    ).toBeHidden();
  });
});

test("should toggle an item's checked state", async ({ page }) => {
  await withNewItem(page, async (itemName) => {
    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} checked`,
        exact: true,
      }),
    ).not.toBeChecked();
    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} unchecked`,
        exact: true,
      }),
    ).toBeHidden();

    await page
      .getByRole("checkbox", { name: `toggle ${itemName} checked` })
      .check();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} unchecked`,
        exact: true,
      }),
    ).toBeChecked();
    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} checked`,
        exact: true,
      }),
    ).toBeHidden();

    await page
      .getByRole("checkbox", { name: `toggle ${itemName} unchecked` })
      .uncheck();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} checked`,
        exact: true,
      }),
    ).not.toBeChecked();
    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} unchecked`,
        exact: true,
      }),
    ).toBeHidden();
  });
});

test("should suggest existing items", async ({ page }) => {
  await withNewItems(page, 3, async (items) => {
    await page
      .getByRole("combobox", { name: "add item to list" })
      .fill("item ");

    for (const itemName of items) {
      await expect(
        page.getByRole("option", { name: itemName, exact: true }),
      ).toBeVisible();
    }

    await page
      .getByRole("combobox", { name: "add item to list" })
      .fill(items[0]);

    await expect(page.getByRole("option", { name: `item ` })).toHaveCount(1);
    await expect(
      page.getByRole("option", { name: items[0], exact: true }),
    ).toBeVisible();
  });
});

test("should unchecked checked item when added", async ({ page }) => {
  await withNewItem(page, async (itemName) => {
    await page
      .getByRole("checkbox", { name: `toggle ${itemName} checked` })
      .check();
    await expect(
      page.getByRole("checkbox", { name: `toggle ${itemName} unchecked` }),
    ).toBeChecked();

    await page
      .getByRole("combobox", { name: "add item to list" })
      .fill(itemName);
    await page.getByRole("option", { name: itemName }).click();
    await page.getByRole("button", { name: "add item" }).click();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemName} checked`,
        exact: true,
      }),
    ).not.toBeChecked();
  });
});

test("should change item name", async ({ page }) => {
  await withNewItem(page, async (itemName) => {
    const updatedName = `item ${Math.random().toString().slice(2)}`;

    await page
      .getByRole("textbox", { name: `edit ${itemName} name`, exact: true })
      .fill(updatedName);

    await expect(
      page.getByRole("textbox", {
        name: `edit ${updatedName} name`,
        exact: true,
      }),
    ).toBeEnabled();

    await expect(
      page.getByRole("textbox", {
        name: `edit ${itemName} name`,
        exact: true,
      }),
    ).toBeHidden();

    await page
      .getByRole("textbox", { name: `edit ${updatedName} name`, exact: true })
      .fill(itemName);
  });
});

test("restore unchecks all recurring items", async ({ page }) => {
  await withNewItems(page, 4, async (itemNames) => {
    await page
      .getByRole("checkbox", { name: `toggle ${itemNames[0]} checked` })
      .check();
    await expect(
      page.getByRole("checkbox", { name: `toggle ${itemNames[0]} unchecked` }),
    ).toBeChecked();

    await page
      .getByRole("checkbox", { name: `toggle ${itemNames[1]} checked` })
      .check();
    await expect(
      page.getByRole("checkbox", { name: `toggle ${itemNames[1]} unchecked` }),
    ).toBeChecked();

    await page
      .getByRole("checkbox", {
        name: `set ${itemNames[0]} as recurring`,
        exact: true,
      })
      .check();
    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemNames[0]} as non-recurring`,
        exact: true,
      }),
    ).toBeChecked();

    await page
      .getByRole("checkbox", {
        name: `set ${itemNames[2]} as recurring`,
        exact: true,
      })
      .check();
    await expect(
      page.getByRole("checkbox", {
        name: `set ${itemNames[2]} as non-recurring`,
        exact: true,
      }),
    ).toBeChecked();

    await page
      .getByRole("button", { name: "Restore recurring", exact: true })
      .click();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemNames[0]} checked`,
        exact: true,
      }),
    ).not.toBeChecked();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemNames[1]} unchecked`,
        exact: true,
      }),
    ).toBeChecked();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemNames[2]} checked`,
        exact: true,
      }),
    ).not.toBeChecked();

    await expect(
      page.getByRole("checkbox", {
        name: `toggle ${itemNames[3]} checked`,
        exact: true,
      }),
    ).not.toBeChecked();
  });
});

async function withNewItem(
  page: Page,
  testFn: (itemName: string) => Promise<unknown>,
) {
  const itemName = `item ${Math.random().toString().slice(2)}`;

  await page.getByRole("combobox", { name: "add item to list" }).fill(itemName);
  await page.getByRole("option", { name: itemName }).click();
  await page.getByRole("button", { name: "add item" }).click();
  await expect(
    page.getByRole("textbox", {
      name: `edit ${itemName} name`,
      exact: true,
    }),
  ).toHaveValue(itemName);

  try {
    await testFn(itemName);
  } finally {
    try {
      await page.getByRole("button", { name: `delete ${itemName}` }).click();

      await expect(
        page.getByRole("textbox", {
          name: `edit ${itemName} name`,
          exact: true,
        }),
      ).toBeHidden();
    } catch (error) {}
  }
}

async function withNewItems(
  page: Page,
  count: number,
  testFn: (itemNames: string[]) => Promise<unknown>,
) {
  {
    const itemNames = Array.from({ length: count }).map(
      () => `item ${Math.random().toString().slice(2)}`,
    );

    for (const itemName of itemNames) {
      await page
        .getByRole("combobox", { name: "add item to list" })
        .fill(itemName);
      await page.getByRole("option", { name: itemName }).click();
      await page.getByRole("button", { name: "add item" }).click();
      await expect(
        page.getByRole("textbox", {
          name: `edit ${itemName} name`,
          exact: true,
        }),
      ).toHaveValue(itemName);
    }

    try {
      await testFn(itemNames);
    } finally {
      for (const itemName of itemNames) {
        try {
          await page
            .getByRole("button", { name: `delete ${itemName}` })
            .click({ timeout: 100 });
        } catch {}
      }
    }
  }
}
