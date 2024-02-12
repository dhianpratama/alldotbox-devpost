import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      {/* <Form
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Site",
          maxLength: 32,
          disabled:true
        }}
        handleSubmit={updateSite}
      /> */}

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Twitter"
        description="The twitter handle of your site contact button."
        helpText="Include twitter so the interested buyer can contact directly."
        inputAttrs={{
          name: "twitter",
          type: "text",
          defaultValue: data?.twitter!,
          placeholder: "@awesomename",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Background image"
        description="The background image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB."
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.image!,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Button Color"
        description="The twitter handle of your site contact button."
        helpText="Include twitter so the interested buyer can contact directly."
        inputAttrs={{
          name: "buttonColor",
          type: "color",
          defaultValue: data?.buttonColor!,
          placeholder: "Contact Button Color ",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Button Text Color"
        description="The twitter handle of your site contact button."
        helpText="Include twitter so the interested buyer can contact directly."
        inputAttrs={{
          name: "buttonTextColor",
          type: "color",
          defaultValue: data?.buttonTextColor!,
          placeholder: "Color of Contact Button Text",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

    </div>
  );
}
