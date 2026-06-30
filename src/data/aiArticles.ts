export type AiArticleAssetType = "pdf" | "tex" | "md";

export interface AiArticleAsset {
  href: string;
  label: string;
  type: AiArticleAssetType;
}

export interface AiArticle {
  slug: string;
  href: string;
  title: string;
  description: string;
  date: string;
  datetime: string;
  section: string;
  assets: readonly AiArticleAsset[];
}

export interface AiArticleGroup {
  title: string;
  hrefs: readonly string[];
}

export const aiArticles = [
  {
    href: "/ai-assisted-math/filtered-equivariant-membership-static-algebraic-proof-degree.html",
    title: "Filtered Equivariant Membership and Static Algebraic Proof Degree",
    description: "Static algebraic proof degree, homogenized presentation ideals, finite-domain filtered membership, Boolean reciprocals, and equivariant Macaulay compression.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "filtered-equivariant-membership-static-algebraic-proof-degree",
    section: "Algebraic and Computational Complexity",
    assets: [
      {
        href: "/assets/ai-assisted-math/filtered-equivariant-membership-static-algebraic-proof-degree/filtered-equivariant-membership-static-algebraic-proof-degree.pdf",
        label: "PDF: Filtered Equivariant Membership Static Algebraic Proof Degree",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/filtered-equivariant-membership-static-algebraic-proof-degree/filtered-equivariant-membership-static-algebraic-proof-degree.tex",
        label: "TeX source: Filtered Equivariant Membership Static Algebraic Proof Degree",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/representation-theoretic-scalar-compression-linear-differential-equations.html",
    title: "Representation-Theoretic Scalar Compression for Linear Differential Equations",
    description: "Minimum scalar differential order from realized orbit spans, with Picard-Fuchs observables, periods, and isotypic rank formulas.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "representation-theoretic-scalar-compression-linear-differential-equations",
    section: "Algebraic and Computational Complexity",
    assets: [
      {
        href: "/assets/ai-assisted-math/representation-theoretic-scalar-compression-linear-differential-equations/representation-theoretic-scalar-compression-linear-differential-equations.pdf",
        label: "PDF: Representation Theoretic Scalar Compression Linear Differential Equations",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/representation-theoretic-scalar-compression-linear-differential-equations/representation-theoretic-scalar-compression-linear-differential-equations.tex",
        label: "TeX source: Representation Theoretic Scalar Compression Linear Differential Equations",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/fragmented-presentation-systems-resource-bound-degrees.html",
    title: "Fragmented Presentation Systems and Resource-Bound Degrees",
    description: "Decidable bounded fragments, positive-instance width profiles, exact Turing degrees of resource bounds, and representation-profile applications.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "fragmented-presentation-systems-resource-bound-degrees",
    section: "Direct Applications",
    assets: [
      {
        href: "/assets/ai-assisted-math/fragmented-presentation-systems-resource-bound-degrees/fragmented-presentation-systems-resource-bound-degrees.pdf",
        label: "PDF: Fragmented Presentation Systems Resource Bound Degrees",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/fragmented-presentation-systems-resource-bound-degrees/fragmented-presentation-systems-resource-bound-degrees.tex",
        label: "TeX source: Fragmented Presentation Systems Resource Bound Degrees",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/presentation-incidence-rank-fibres-multiparameter-persistence.html",
    title: "Presentation Incidence and Rank-Invariant Fibres in Multiparameter Persistence",
    description: "Antichain presentation modules, active polymatroid profiles, matroid realization strata, and quiver representation geometry inside multiparameter persistence.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "presentation-incidence-rank-fibres-multiparameter-persistence",
    section: "Direct Applications",
    assets: [
      {
        href: "/assets/ai-assisted-math/presentation-incidence-rank-fibres-multiparameter-persistence/presentation-incidence-rank-fibres-multiparameter-persistence.pdf",
        label: "PDF: Presentation Incidence Rank Fibres Multiparameter Persistence",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/presentation-incidence-rank-fibres-multiparameter-persistence/presentation-incidence-rank-fibres-multiparameter-persistence.tex",
        label: "TeX source: Presentation Incidence Rank Fibres Multiparameter Persistence",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/exact-preimage-layers-effective-primitive-divisors-rational-maps-p1.html",
    title: "Exact Preimage Layers and Effective Primitive Divisors for Rational Maps on P1",
    description: "A preliminary note on exact preimage layers and effective primitive divisor criteria for rational maps on the projective line.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "exact-preimage-layers-effective-primitive-divisors-rational-maps-p1",
    section: "Arithmetic Dynamics and Geometry",
    assets: [
      {
        href: "/assets/ai-assisted-math/exact-preimage-layers-effective-primitive-divisors-rational-maps-p1/exact-preimage-layers-effective-primitive-divisors-rational-maps-p1.pdf",
        label: "PDF: Exact Preimage Layers Effective Primitive Divisors Rational Maps P1",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/exact-preimage-layers-effective-primitive-divisors-rational-maps-p1/exact-preimage-layers-effective-primitive-divisors-rational-maps-p1.tex",
        label: "TeX source: Exact Preimage Layers Effective Primitive Divisors Rational Maps P1",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences.html",
    title: "Proof-Carrying Toric Guard Certificates for Positivity of Linear Recurrence Sequences",
    description: "A preliminary note on proof-carrying toric guard certificates for positivity of real algebraic linear recurrence sequences.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences",
    section: "Algebraic and Computational Complexity",
    assets: [
      {
        href: "/assets/ai-assisted-math/proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences/proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences.pdf",
        label: "PDF: Proof Carrying Toric Guard Certificates Positivity Linear Recurrence Sequences",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences/proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences.tex",
        label: "TeX source: Proof Carrying Toric Guard Certificates Positivity Linear Recurrence Sequences",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/exact-rational-preperiodic-portraits-controlled-p-adic-traps.html",
    title: "Exact Rational Preperiodic Portraits from Controlled p-adic Traps",
    description: "A preliminary note constructing exact rational preperiodic portraits for rational maps from controlled bad reduction and p-adic trap dynamics.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "exact-rational-preperiodic-portraits-controlled-p-adic-traps",
    section: "Arithmetic Dynamics and Geometry",
    assets: [
      {
        href: "/assets/ai-assisted-math/exact-rational-preperiodic-portraits-controlled-p-adic-traps/exact-rational-preperiodic-portraits-controlled-p-adic-traps.pdf",
        label: "PDF: Exact Rational Preperiodic Portraits Controlled P Adic Traps",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/exact-rational-preperiodic-portraits-controlled-p-adic-traps/exact-rational-preperiodic-portraits-controlled-p-adic-traps.tex",
        label: "TeX source: Exact Rational Preperiodic Portraits Controlled P Adic Traps",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/toric-certificates-effective-skolem-tails-subspace-orbit-reachability.html",
    title: "Toric Certificates for Effective Skolem Tails and Subspace Orbit Reachability",
    description: "A preliminary note on toric lower-bound certificates, binomial-stratified certificate trees, and automatic effective zero-free tails for simultaneous Skolem and subspace orbit reachability.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "toric-certificates-effective-skolem-tails-subspace-orbit-reachability",
    section: "Algebraic and Computational Complexity",
    assets: [
      {
        href: "/assets/ai-assisted-math/toric-certificates-effective-skolem-tails-subspace-orbit-reachability/toric-certificates-effective-skolem-tails-subspace-orbit-reachability.pdf",
        label: "PDF: Toric Certificates Effective Skolem Tails Subspace Orbit Reachability",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/toric-certificates-effective-skolem-tails-subspace-orbit-reachability/toric-certificates-effective-skolem-tails-subspace-orbit-reachability.tex",
        label: "TeX source: Toric Certificates Effective Skolem Tails Subspace Orbit Reachability",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/blow-up-diagonal-depth-wonderful-compactifications.html",
    title: "Blow-up Diagonal Depth and Wonderful Compactifications",
    description: "A preliminary note on coherent product diagonal depth under smooth blow-ups, with applications to wonderful compactifications, Fulton-MacPherson spaces, and moduli spaces of pointed curves.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "blow-up-diagonal-depth-wonderful-compactifications",
    section: "Arithmetic Dynamics and Geometry",
    assets: [
      {
        href: "/assets/ai-assisted-math/blow-up-diagonal-depth-wonderful-compactifications/blow-up-diagonal-depth-wonderful-compactifications.pdf",
        label: "PDF: Blow Up Diagonal Depth Wonderful Compactifications",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/blow-up-diagonal-depth-wonderful-compactifications/blow-up-diagonal-depth-wonderful-compactifications.tex",
        label: "TeX source: Blow Up Diagonal Depth Wonderful Compactifications",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/dependency-depth-odd-hassett-spaces.html",
    title: "Dependency Depth, Strict Product Diagonal Depth, and Rouquier Dimension of Odd Hassett Spaces",
    description: "A preliminary note extracting optimal Rouquier dimension bounds for odd-heavy Hassett spaces from dependency depth and strict product diagonal depth.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "dependency-depth-odd-hassett-spaces",
    section: "Arithmetic Dynamics and Geometry",
    assets: [
      {
        href: "/assets/ai-assisted-math/dependency-depth-odd-hassett-spaces/dependency-depth-odd-hassett-spaces.pdf",
        label: "PDF: Dependency Depth Odd Hassett Spaces",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/dependency-depth-odd-hassett-spaces/dependency-depth-odd-hassett-spaces.tex",
        label: "TeX source: Dependency Depth Odd Hassett Spaces",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/polar-code-endpoint-class-two-p-groups.html",
    title: "The Polar-Code Endpoint for Class-Two p-Groups",
    description: "The endpoint of the class-two p-group observer hierarchy: polar-code completeness, generic geometric reconstruction, and standard-structure residual reduction.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "polar-code-endpoint-class-two-p-groups",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/polar-code-endpoint-class-two-p-groups/polar-code-endpoint-class-two-p-groups.pdf",
        label: "PDF: Polar Code Endpoint Class Two P Groups",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/polar-code-endpoint-class-two-p-groups/polar-code-endpoint-class-two-p-groups.tex",
        label: "TeX source: Polar Code Endpoint Class Two P Groups",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/finite-lovasz-profiles-coprime-affine-groups.html",
    title: "Finite Lovász Profiles for Coprime Affine Groups",
    description: "Finite left and right Lovász dimensions, bounded hom-count test families, and two-object tests for coprime affine groups.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "finite-lovasz-profiles-coprime-affine-groups",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/finite-lovasz-profiles-coprime-affine-groups/finite-lovasz-profiles-coprime-affine-groups.pdf",
        label: "PDF: Finite Lovasz Profiles Coprime Affine Groups",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/finite-lovasz-profiles-coprime-affine-groups/finite-lovasz-profiles-coprime-affine-groups.tex",
        label: "TeX source: Finite Lovasz Profiles Coprime Affine Groups",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/relative-linear-word-observers-semidirect-products.html",
    title: "Relative Linear Word Observers and Representation Complexity of Semidirect Products",
    description: "Relative k-linear word observers, matrix-rank profiles, and semisimple, cyclic modular, and wild regimes for marked semidirect products.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "relative-linear-word-observers-semidirect-products",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/relative-linear-word-observers-semidirect-products/relative-linear-word-observers-semidirect-products.pdf",
        label: "PDF: Relative Linear Word Observers Semidirect Products",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/relative-linear-word-observers-semidirect-products/relative-linear-word-observers-semidirect-products.tex",
        label: "TeX source: Relative Linear Word Observers Semidirect Products",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/word-measure-twins-pfaffian-moduli-class-two-p-groups.html",
    title: "Word-Measure Twins and Pfaffian Moduli in Class-Two p-Groups",
    description: "Large families of non-isomorphic class-two p-groups with identical word-map distributions, built from Pfaffian moduli.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "word-measure-twins-pfaffian-moduli-class-two-p-groups",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/word-measure-twins-pfaffian-moduli-class-two-p-groups/word-measure-twins-pfaffian-moduli-class-two-p-groups.pdf",
        label: "PDF: Word Measure Twins Pfaffian Moduli Class Two P Groups",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/word-measure-twins-pfaffian-moduli-class-two-p-groups/word-measure-twins-pfaffian-moduli-class-two-p-groups.tex",
        label: "TeX source: Word Measure Twins Pfaffian Moduli Class Two P Groups",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/complete-commutator-word-tomography-alternating-pencils.html",
    title: "Complete Commutator-Word Tomography of Alternating Pencils",
    description: "Complete word-moment observability of the skew-symmetric Kronecker data of alternating commutator pencils.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "complete-commutator-word-tomography-alternating-pencils",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/complete-commutator-word-tomography-alternating-pencils/complete-commutator-word-tomography-alternating-pencils.pdf",
        label: "PDF: Complete Commutator Word Tomography Alternating Pencils",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/complete-commutator-word-tomography-alternating-pencils/complete-commutator-word-tomography-alternating-pencils.tex",
        label: "TeX source: Complete Commutator Word Tomography Alternating Pencils",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/generic-odd-pfaffian-reconstruction-commutator-word-moments.html",
    title: "Generic Odd-Pfaffian Reconstruction from Commutator-Word Moments",
    description: "Generic reconstruction of odd Pfaffian alternating tensors from pointwise Fourier-tagged commutator-word moment data.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "generic-odd-pfaffian-reconstruction-commutator-word-moments",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/generic-odd-pfaffian-reconstruction-commutator-word-moments/generic-odd-pfaffian-reconstruction-commutator-word-moments.pdf",
        label: "PDF: Generic Odd Pfaffian Reconstruction Commutator Word Moments",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/generic-odd-pfaffian-reconstruction-commutator-word-moments/generic-odd-pfaffian-reconstruction-commutator-word-moments.tex",
        label: "TeX source: Generic Odd Pfaffian Reconstruction Commutator Word Moments",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/sharp-support-image-thresholds-alternating-pencils.html",
    title: "Pfaffian Degree as Observer Complexity in Class-Two p-Groups",
    description: "Exact support-image and word-observer depth theorems for regular alternating pencils and associated class-two exponent-p groups.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "sharp-support-image-thresholds-alternating-pencils",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/sharp-support-image-thresholds-alternating-pencils/sharp-support-image-thresholds-alternating-pencils.pdf",
        label: "PDF: Sharp Support Image Thresholds Alternating Pencils",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/sharp-support-image-thresholds-alternating-pencils/sharp-support-image-thresholds-alternating-pencils.tex",
        label: "TeX source: Sharp Support Image Thresholds Alternating Pencils",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/star-support-image-profiles-class-two-p-groups.html",
    title: "Star and Support-Image Profiles for Class-Two p-Groups",
    description: "A comparison of higher commuting probabilities, star profiles, rank-support enumerators, support-image profiles, and centralizer transforms for class-two exponent-p groups.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "star-support-image-profiles-class-two-p-groups",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/star-support-image-profiles-class-two-p-groups/star-support-image-profiles-class-two-p-groups.pdf",
        label: "PDF: Star Support Image Profiles Class Two P Groups",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/star-support-image-profiles-class-two-p-groups/star-support-image-profiles-class-two-p-groups.tex",
        label: "TeX source: Star Support Image Profiles Class Two P Groups",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/quadratic-presentational-complexity-observer-barriers.html",
    title: "Quadratic Presentational Complexity and Exact Observer Barriers for Class-Two p-Groups",
    description: "Quadratic normal forms for word observers, graphical class-two groups, right homomorphism profiles, and exact arity barriers.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "quadratic-presentational-complexity-observer-barriers",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/quadratic-presentational-complexity-observer-barriers/quadratic-presentational-complexity-observer-barriers.pdf",
        label: "PDF: Quadratic Presentational Complexity Observer Barriers",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/quadratic-presentational-complexity-observer-barriers/quadratic-presentational-complexity-observer-barriers.tex",
        label: "TeX source: Quadratic Presentational Complexity Observer Barriers",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/certified-adaptive-discovery-algebraic-laws.html",
    title: "Certified Adaptive Discovery of Algebraic Laws",
    description: "A finite-sample inference layer for algebraic laws discovered after adaptive search, using volume certificates, e-values, and rational-data certificates.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "certified-adaptive-discovery-algebraic-laws",
    section: "Algebraic and Computational Complexity",
    assets: [
      {
        href: "/assets/ai-assisted-math/certified-adaptive-discovery-algebraic-laws/certified-adaptive-discovery-algebraic-laws.pdf",
        label: "PDF: Certified Adaptive Discovery Algebraic Laws",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/certified-adaptive-discovery-algebraic-laws/certified-adaptive-discovery-algebraic-laws.tex",
        label: "TeX source: Certified Adaptive Discovery Algebraic Laws",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/box-closure-systems-downsets-products-of-chains.html",
    title: "Representatives of Box-Closure Systems on Downsets of Products of Chains",
    description: "A complete representative theorem for coordinate-mixture box-closure systems on finite downsets of products of chains, with matroidal and enumerative consequences.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "box-closure-systems-downsets-products-of-chains",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/box-closure-systems-downsets-products-of-chains/box-closure-systems-downsets-products-of-chains.pdf",
        label: "PDF: Box Closure Systems Downsets Products Of Chains",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/box-closure-systems-downsets-products-of-chains/box-closure-systems-downsets-products-of-chains.tex",
        label: "TeX source: Box Closure Systems Downsets Products Of Chains",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/relation-lattices-kolmogorov-deficiency-rational-points.html",
    title: "Relation Lattices and Kolmogorov Deficiency of Rational Points",
    description: "A relation-lattice profile of rational points, random-lattice limits, and finite-height Kolmogorov deficiency from short arithmetic certificates.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "relation-lattices-kolmogorov-deficiency-rational-points",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/relation-lattices-kolmogorov-deficiency-rational-points/relation-lattices-kolmogorov-deficiency-rational-points.pdf",
        label: "PDF: Relation Lattices Kolmogorov Deficiency Rational Points",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/relation-lattices-kolmogorov-deficiency-rational-points/relation-lattices-kolmogorov-deficiency-rational-points.tex",
        label: "TeX source: Relation Lattices Kolmogorov Deficiency Rational Points",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/relation-lattices-kolmogorov-deficiency-rational-points/relation-lattices-kolmogorov-deficiency-rational-points.md",
        label: "Markdown source: Relation Lattices Kolmogorov Deficiency Rational Points",
        type: "md"
      }
    ]
  },
  {
    href: "/ai-assisted-math/degree-weighted-normal-covers-symmetric-alternating-groups.html",
    title: "Degree-weighted Normal Covers of Symmetric and Alternating Groups",
    description: "A degree-weighted analogue of normal covering numbers for symmetric and alternating groups, with arithmetic motivation from intersective polynomials.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "degree-weighted-normal-covers-symmetric-alternating-groups",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/degree-weighted-normal-covers-symmetric-alternating-groups/degree-weighted-normal-covers-symmetric-alternating-groups.pdf",
        label: "PDF: Degree Weighted Normal Covers Symmetric Alternating Groups",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/degree-weighted-normal-covers-symmetric-alternating-groups/degree-weighted-normal-covers-symmetric-alternating-groups.tex",
        label: "TeX source: Degree Weighted Normal Covers Symmetric Alternating Groups",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/degree-weighted-normal-covers-symmetric-alternating-groups/degree-weighted-normal-covers-symmetric-alternating-groups.md",
        label: "Markdown source: Degree Weighted Normal Covers Symmetric Alternating Groups",
        type: "md"
      }
    ]
  },
  {
    href: "/ai-assisted-math/random-saturation-real-homogeneous-threshold-boxes.html",
    title: "Random Saturation and Optimal Off-Origin Slack in Real Homogeneous Boolean Threshold Boxes",
    description: "A real-coefficient bounded-height model for homogeneous Boolean threshold boxes, random saturation, and optimal off-origin slack.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "random-saturation-real-homogeneous-threshold-boxes",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/random-saturation-real-homogeneous-threshold-boxes/random-saturation-optimal-off-origin-slack-real-homogeneous-boolean-threshold-boxes.pdf",
        label: "PDF: Random Saturation Optimal Off Origin Slack Real Homogeneous Boolean Threshold Boxes",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/random-saturation-real-homogeneous-threshold-boxes/random-saturation-optimal-off-origin-slack-real-homogeneous-boolean-threshold-boxes.tex",
        label: "TeX source: Random Saturation Optimal Off Origin Slack Real Homogeneous Boolean Threshold Boxes",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/random-saturation-real-homogeneous-threshold-boxes/random-saturation-optimal-off-origin-slack-real-homogeneous-boolean-threshold-boxes.md",
        label: "Markdown source: Random Saturation Optimal Off Origin Slack Real Homogeneous Boolean Threshold Boxes",
        type: "md"
      }
    ]
  },
  {
    href: "/ai-assisted-math/sharp-random-thresholds-exact-ternary-lifts.html",
    title: "Sharp Random Thresholds for Exact Ternary Homogeneous Boolean Lifts",
    description: "A sharp random threshold theorem for exact ternary homogeneous Boolean lifts in the expanded coefficient presentation.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "sharp-random-thresholds-exact-ternary-lifts",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/sharp-random-thresholds-exact-ternary-lifts/sharp-random-thresholds-exact-ternary-homogeneous-boolean-lifts.pdf",
        label: "PDF: Sharp Random Thresholds Exact Ternary Homogeneous Boolean Lifts",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/sharp-random-thresholds-exact-ternary-lifts/sharp-random-thresholds-exact-ternary-homogeneous-boolean-lifts.tex",
        label: "TeX source: Sharp Random Thresholds Exact Ternary Homogeneous Boolean Lifts",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/sharp-random-thresholds-exact-ternary-lifts/sharp-random-thresholds-exact-ternary-homogeneous-boolean-lifts.md",
        label: "Markdown source: Sharp Random Thresholds Exact Ternary Homogeneous Boolean Lifts",
        type: "md"
      }
    ]
  },
  {
    href: "/ai-assisted-math/lattice-obstructions-coefficient-alphabets.html",
    title: "Lattice Obstructions and Coefficient Alphabets for Homogeneous Boolean Lifts",
    description: "Exact notes on two-point encoding lattices, universal denominators, coefficient alphabets, and homogeneous Boolean lift criteria.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "lattice-obstructions-coefficient-alphabets",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/lattice-obstructions-coefficient-alphabets/lattice-obstructions-coefficient-alphabets-homogeneous-boolean-lifts.pdf",
        label: "PDF: Lattice Obstructions Coefficient Alphabets Homogeneous Boolean Lifts",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/lattice-obstructions-coefficient-alphabets/lattice-obstructions-coefficient-alphabets-homogeneous-boolean-lifts.tex",
        label: "TeX source: Lattice Obstructions Coefficient Alphabets Homogeneous Boolean Lifts",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/lattice-obstructions-coefficient-alphabets/lattice-obstructions-coefficient-alphabets-homogeneous-boolean-lifts.md",
        label: "Markdown source: Lattice Obstructions Coefficient Alphabets Homogeneous Boolean Lifts",
        type: "md"
      }
    ]
  },
  {
    href: "/ai-assisted-math/conway-thrackle-proof-strategy.html",
    title: "Switch Corridors and Boundary-Rigid Lenses in Even Dumbbell Thrackles: A Local Reduction and Minimal-Witness Strategy",
    description: "A local reduction and minimal-witness strategy for the irreducible even-dumbbell step in Conway's thrackle program.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "conway-thrackle-proof-strategy",
    section: "Proof Strategies",
    assets: [
      {
        href: "/assets/ai-assisted-math/conway-thrackle-proof-strategy/switch-corridors-boundary-rigid-lenses-conway.pdf",
        label: "PDF: Switch Corridors Boundary Rigid Lenses Conway",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/conway-thrackle-proof-strategy/switch-corridors-boundary-rigid-lenses-conway.tex",
        label: "TeX source: Switch Corridors Boundary Rigid Lenses Conway",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/conway-thrackle-proof-strategy/switch-corridors-boundary-rigid-lenses-conway.md",
        label: "Markdown source: Switch Corridors Boundary Rigid Lenses Conway",
        type: "md"
      }
    ]
  },
  {
    href: "/ai-assisted-math/previous-copy-compression-quantitative-barriers.html",
    title: "Previous-Copy Compression: Quantitative Barriers",
    description: "Advanced notes on finite stammering profiles, exponential tube barriers, and conditional quantitative lower bounds.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "previous-copy-compression-quantitative-barriers",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/previous-copy-parsing/finite-stammering-profiles-tube-barriers.pdf",
        label: "PDF: Finite Stammering Profiles Tube Barriers",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/previous-copy-parsing/finite-stammering-profiles-tube-barriers.tex",
        label: "TeX source: Finite Stammering Profiles Tube Barriers",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/previous-copy-compression-foundations.html",
    title: "Previous-Copy Compression: Foundations and Algebraic Digit Expansions",
    description: "Foundational papers on online previous-copy parsing, extremal and metric behaviour, and algebraic digit expansions.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "previous-copy-compression-foundations",
    section: "Compression, Boolean Lifts, and Finite Structures",
    assets: [
      {
        href: "/assets/ai-assisted-math/previous-copy-parsing/previous-copy-compression-algebraic-digit-expansions.pdf",
        label: "PDF: Previous Copy Compression Algebraic Digit Expansions",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/previous-copy-parsing/previous-copy-compression-algebraic-digit-expansions.tex",
        label: "TeX source: Previous Copy Compression Algebraic Digit Expansions",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/previous-copy-parsing/metric-extremal-online-previous-copy-compression.pdf",
        label: "PDF: Metric Extremal Online Previous Copy Compression",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/previous-copy-parsing/metric-extremal-online-previous-copy-compression.tex",
        label: "TeX source: Metric Extremal Online Previous Copy Compression",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/lef-growth-wreath-products.html",
    title: "LEF Growth of Wreath Products with Abelian and Virtually Abelian Lamps",
    description: "A paper on LEF growth for wreath products with abelian, non-abelian, virtually abelian, and Heisenberg-base examples.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "lef-growth-wreath-products",
    section: "Observable Geometry in Groups",
    assets: [
      {
        href: "/assets/ai-assisted-math/lef-growth-wreath-products/lef-growth-wreath-products.pdf",
        label: "PDF: Lef Growth Wreath Products",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/lef-growth-wreath-products/lef-growth-wreath-products.tex",
        label: "TeX source: Lef Growth Wreath Products",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/local-linear-presentations-sparse-factorization.html",
    title: "Local Linear Presentations and Sparse Factorization Complexity",
    description: "Local presentation rank, sparse factorization complexity, exact linear data structures, and dynamic prefix-sum lower-bound problems.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "local-linear-presentations-sparse-factorization",
    section: "Algebraic and Computational Complexity",
    assets: [
      {
        href: "/assets/ai-assisted-math/local-linear-presentations-sparse-factorization/local-linear-presentations-sparse-factorization.pdf",
        label: "PDF: Local Linear Presentations Sparse Factorization",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/local-linear-presentations-sparse-factorization/local-linear-presentations-sparse-factorization.tex",
        label: "TeX source: Local Linear Presentations Sparse Factorization",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres.html",
    title: "Presentation Theory II: Controlled Transfer, Observable Budgets, and the Geometry of Fibres",
    description: "Transfer packages, fragmented budgets, convergence moduli, finite-window radii, wild fixed rank-profile fibres, and fibre navigation.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres",
    section: "Axiomatic Core",
    assets: [
      {
        href: "/assets/ai-assisted-math/presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres/presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres.pdf",
        label: "PDF: Presentation Theory Ii Controlled Transfer Observable Budgets Geometry Fibres",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres/presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres.tex",
        label: "TeX source: Presentation Theory Ii Controlled Transfer Observable Budgets Geometry Fibres",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/presentation-theory-iii-normal-form-compilation.html",
    title: "Presentation Theory III: Normal-Form Compilation, Residual Fibres, and Stable Canonical Access",
    description: "Normal-form packages, residual fibres, separator lower bounds, fragmented towers, heighted no-free normal forms, rewriting budgets, and spectral instability.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "presentation-theory-iii-normal-form-compilation",
    section: "Axiomatic Core",
    assets: [
      {
        href: "/assets/ai-assisted-math/presentation-theory-iii-normal-form-compilation/presentation-theory-iii-normal-form-compilation.pdf",
        label: "PDF: Presentation Theory Iii Normal Form Compilation",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/presentation-theory-iii-normal-form-compilation/presentation-theory-iii-normal-form-compilation.tex",
        label: "TeX source: Presentation Theory Iii Normal Form Compilation",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability.html",
    title: "Presentation Theory IV: Verifiable Access, Audit Lower Bounds, and Residual Indistinguishability",
    description: "Verifiable access, audit covers, transcripts, residual indistinguishability, pullback lower bounds, and auditable Lovasz separation for CFI graphs.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability",
    section: "Axiomatic Core",
    assets: [
      {
        href: "/assets/ai-assisted-math/presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability/presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability.pdf",
        label: "PDF: Presentation Theory Iv Verifiable Access Audit Lower Bounds Residual Indistinguishability",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability/presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability.tex",
        label: "TeX source: Presentation Theory Iv Verifiable Access Audit Lower Bounds Residual Indistinguishability",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/no-free-degenerations-presentation-cost-heights-normal-forms.html",
    title: "No Free Degenerations: Presentation Cost, Heights, and the Arithmetic Price of Normal Forms",
    description: "Heighted normal-form presentations, gauge and degeneration costs, orbit-closure height bounds, controlled transfer, and representative-moduli gap estimates.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "no-free-degenerations-presentation-cost-heights-normal-forms",
    section: "Direct Applications",
    assets: [
      {
        href: "/assets/ai-assisted-math/no-free-degenerations-presentation-cost-heights-normal-forms/no-free-degenerations-presentation-cost-heights-normal-forms.pdf",
        label: "PDF: No Free Degenerations Presentation Cost Heights Normal Forms",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/no-free-degenerations-presentation-cost-heights-normal-forms/no-free-degenerations-presentation-cost-heights-normal-forms.tex",
        label: "TeX source: No Free Degenerations Presentation Cost Heights Normal Forms",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/invisible-flats-marked-normal-forms.html",
    title: "Invisible Flats and the Cost of Marked Normal Forms",
    description: "Rate-distortion lower bounds for marked reconstruction from finite-depth Torelli, Johnson, homological, and level data via invisible mapping-class-group flats.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "invisible-flats-marked-normal-forms",
    section: "Direct Applications",
    assets: [
      {
        href: "/assets/ai-assisted-math/invisible-flats-marked-normal-forms/invisible-flats-marked-normal-forms.pdf",
        label: "PDF: Invisible Flats Marked Normal Forms",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/invisible-flats-marked-normal-forms/invisible-flats-marked-normal-forms.tex",
        label: "TeX source: Invisible Flats Marked Normal Forms",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/atlas-controlled-transfer-packages.html",
    title: "Atlas of Controlled Transfer Packages",
    description: "An operational atlas of contexts, observables, verification data, fibres, and overhead functions for building transfer packages in Presentation Theory.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "atlas-controlled-transfer-packages",
    section: "Addenda",
    assets: [
      {
        href: "/assets/ai-assisted-math/atlas-controlled-transfer-packages/atlas-controlled-transfer-packages.pdf",
        label: "PDF: Atlas Controlled Transfer Packages",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/atlas-controlled-transfer-packages/atlas-controlled-transfer-packages.tex",
        label: "TeX source: Atlas Controlled Transfer Packages",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/controlled-transfer-in-action.html",
    title: "Controlled Transfer in Action: Selected Examples",
    description: "A selected addendum of controlled-transfer results, from quantized law discovery and Hensel-tree rationality to automatic lattice-walk returns and Frobenius modular codes.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "controlled-transfer-in-action",
    section: "Addenda",
    assets: [
      {
        href: "/assets/ai-assisted-math/controlled-transfer-in-action/controlled-transfer-in-action.pdf",
        label: "PDF: Controlled Transfer In Action",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/controlled-transfer-in-action/controlled-transfer-in-action.tex",
        label: "TeX source: Controlled Transfer In Action",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/statement-presentations-semilinear-greedy-3-sumfree-sequence.html",
    title: "Statement Presentations and a Semilinear Greedy 3-Sumfree Sequence",
    description: "A direct semilinear proof of a parametric greedy 3-sumfree sequence formula, with a presentation-theoretic reading of the finite interval-sum verification.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "statement-presentations-semilinear-greedy-3-sumfree-sequence",
    section: "Direct Applications",
    assets: [
      {
        href: "/assets/ai-assisted-math/statement-presentations-semilinear-greedy-3-sumfree-sequence/statement-presentations-semilinear-greedy-3-sumfree-sequence.pdf",
        label: "PDF: Statement Presentations Semilinear Greedy 3 Sumfree Sequence",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/statement-presentations-semilinear-greedy-3-sumfree-sequence/statement-presentations-semilinear-greedy-3-sumfree-sequence.tex",
        label: "TeX source: Statement Presentations Semilinear Greedy 3 Sumfree Sequence",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/presentation-theory.html",
    title: "Presentation Theory",
    description: "Presentation systems, realization fibres, observables, verification costs, normal forms, and reusable proof principles.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "presentation-theory",
    section: "Axiomatic Core",
    assets: [
      {
        href: "/assets/ai-assisted-math/presentation-theory/presentation-theory.pdf",
        label: "PDF: Presentation Theory",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/presentation-theory/presentation-theory.tex",
        label: "TeX source: Presentation Theory",
        type: "tex"
      }
    ]
  },
  {
    href: "/ai-assisted-math/predictive-fibres-critical-oseen-transfer-navier-stokes.html",
    title: "Predictive Fibres and Critical Oseen Transfer for Navier-Stokes: Conditional Proof Strategy",
    description: "An original presentation-theoretic conditional reduction for three-dimensional Navier-Stokes, with closed proof modules and a complete list of remaining source blocks.",
    date: "June 2026",
    datetime: "2026-06",
    slug: "predictive-fibres-critical-oseen-transfer-navier-stokes",
    section: "Proof Strategies",
    assets: [
      {
        href: "/assets/ai-assisted-math/predictive-fibres-critical-oseen-transfer-navier-stokes/predictive-fibres-critical-oseen-transfer-navier-stokes.pdf",
        label: "PDF: Predictive Fibres Critical Oseen Transfer Navier Stokes",
        type: "pdf"
      },
      {
        href: "/assets/ai-assisted-math/predictive-fibres-critical-oseen-transfer-navier-stokes/predictive-fibres-critical-oseen-transfer-navier-stokes.tex",
        label: "TeX source: Predictive Fibres Critical Oseen Transfer Navier Stokes",
        type: "tex"
      },
      {
        href: "/assets/ai-assisted-math/predictive-fibres-critical-oseen-transfer-navier-stokes/predictive-fibres-critical-oseen-transfer-navier-stokes-proof-audit.md",
        label: "Markdown source: Predictive Fibres Critical Oseen Transfer Navier Stokes Proof Audit",
        type: "md"
      }
    ]
  }
] as const satisfies readonly AiArticle[];

export const aiArticleGroups = [
  {
    title: "Axiomatic Core",
    hrefs: [
      "/ai-assisted-math/presentation-theory.html",
      "/ai-assisted-math/presentation-theory-ii-controlled-transfer-observable-budgets-geometry-fibres.html",
      "/ai-assisted-math/presentation-theory-iii-normal-form-compilation.html",
      "/ai-assisted-math/presentation-theory-iv-verifiable-access-audit-lower-bounds-residual-indistinguishability.html"
    ]
  },
  {
    title: "Addenda",
    hrefs: [
      "/ai-assisted-math/atlas-controlled-transfer-packages.html",
      "/ai-assisted-math/controlled-transfer-in-action.html"
    ]
  },
  {
    title: "Direct Applications",
    hrefs: [
      "/ai-assisted-math/no-free-degenerations-presentation-cost-heights-normal-forms.html",
      "/ai-assisted-math/invisible-flats-marked-normal-forms.html",
      "/ai-assisted-math/statement-presentations-semilinear-greedy-3-sumfree-sequence.html",
      "/ai-assisted-math/fragmented-presentation-systems-resource-bound-degrees.html",
      "/ai-assisted-math/presentation-incidence-rank-fibres-multiparameter-persistence.html"
    ]
  },
  {
    title: "Observable Geometry in Groups",
    hrefs: [
      "/ai-assisted-math/quadratic-presentational-complexity-observer-barriers.html",
      "/ai-assisted-math/star-support-image-profiles-class-two-p-groups.html",
      "/ai-assisted-math/sharp-support-image-thresholds-alternating-pencils.html",
      "/ai-assisted-math/complete-commutator-word-tomography-alternating-pencils.html",
      "/ai-assisted-math/generic-odd-pfaffian-reconstruction-commutator-word-moments.html",
      "/ai-assisted-math/word-measure-twins-pfaffian-moduli-class-two-p-groups.html",
      "/ai-assisted-math/polar-code-endpoint-class-two-p-groups.html",
      "/ai-assisted-math/relative-linear-word-observers-semidirect-products.html",
      "/ai-assisted-math/finite-lovasz-profiles-coprime-affine-groups.html",
      "/ai-assisted-math/degree-weighted-normal-covers-symmetric-alternating-groups.html",
      "/ai-assisted-math/lef-growth-wreath-products.html"
    ]
  },
  {
    title: "Algebraic and Computational Complexity",
    hrefs: [
      "/ai-assisted-math/representation-theoretic-scalar-compression-linear-differential-equations.html",
      "/ai-assisted-math/filtered-equivariant-membership-static-algebraic-proof-degree.html",
      "/ai-assisted-math/local-linear-presentations-sparse-factorization.html",
      "/ai-assisted-math/certified-adaptive-discovery-algebraic-laws.html",
      "/ai-assisted-math/toric-certificates-effective-skolem-tails-subspace-orbit-reachability.html",
      "/ai-assisted-math/proof-carrying-toric-guard-certificates-positivity-linear-recurrence-sequences.html"
    ]
  },
  {
    title: "Arithmetic Dynamics and Geometry",
    hrefs: [
      "/ai-assisted-math/exact-rational-preperiodic-portraits-controlled-p-adic-traps.html",
      "/ai-assisted-math/exact-preimage-layers-effective-primitive-divisors-rational-maps-p1.html",
      "/ai-assisted-math/blow-up-diagonal-depth-wonderful-compactifications.html",
      "/ai-assisted-math/dependency-depth-odd-hassett-spaces.html"
    ]
  },
  {
    title: "Compression, Boolean Lifts, and Finite Structures",
    hrefs: [
      "/ai-assisted-math/previous-copy-compression-foundations.html",
      "/ai-assisted-math/previous-copy-compression-quantitative-barriers.html",
      "/ai-assisted-math/lattice-obstructions-coefficient-alphabets.html",
      "/ai-assisted-math/sharp-random-thresholds-exact-ternary-lifts.html",
      "/ai-assisted-math/random-saturation-real-homogeneous-threshold-boxes.html",
      "/ai-assisted-math/relation-lattices-kolmogorov-deficiency-rational-points.html",
      "/ai-assisted-math/box-closure-systems-downsets-products-of-chains.html"
    ]
  },
  {
    title: "Proof Strategies",
    hrefs: [
      "/ai-assisted-math/predictive-fibres-critical-oseen-transfer-navier-stokes.html",
      "/ai-assisted-math/conway-thrackle-proof-strategy.html"
    ]
  }
] as const satisfies readonly AiArticleGroup[];

export const aiArticlesByHref = new Map(aiArticles.map((article) => [article.href, article]));

export function getAiArticleByHref(href: string): AiArticle | undefined {
  return aiArticlesByHref.get(href);
}

export function getAiArticlePdfAssets(article: AiArticle): AiArticleAsset[] {
  return article.assets.filter((asset) => asset.type === "pdf");
}

export function getAiArticleSourceAssets(article: AiArticle): AiArticleAsset[] {
  return article.assets.filter((asset) => asset.type === "tex" || asset.type === "md");
}
