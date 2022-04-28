package types

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Type Comparisons", func() {
	Describe("AliasType", func() {
		complexTy := &Pointer{InnerType: &Array{InnerType: &Int{}}}
		aliasTy := &Alias{Name: "ilist_ptr", OriginalType: complexTy.Clone()}

		Context("alias vs original", func() {
			It("should be considered equal to the original type", func() {
				Expect(aliasTy.Equals(complexTy, true)).To(BeTrue())
			})
		})

		Context("original vs alias", func() {
			It("should be considered equal to the original type", func() {
				Expect(complexTy.Equals(aliasTy, true)).To(BeTrue())
			})
		})

		Context("alias to an alias", func() {
			secondAlias := &Alias{Name: "ilist_ptr_alias", OriginalType: aliasTy.Clone()}

			Context("second alias vs alias", func() {
				It("should be considered equal to the original type", func() {
					Expect(secondAlias.Equals(aliasTy, true)).To(BeTrue())
				})
			})

			Context("alias vs second alias", func() {
				It("should be considered equal to the original type", func() {
					Expect(aliasTy.Equals(secondAlias, true)).To(BeTrue())
				})
			})

			Context("second alias vs original", func() {
				It("should be considered equal to the original type", func() {
					Expect(secondAlias.Equals(complexTy, true)).To(BeTrue())
				})
			})

			Context("original vs second alias", func() {
				It("should be considered equal to the original type", func() {
					Expect(complexTy.Equals(secondAlias, true)).To(BeTrue())
				})
			})
		})
	})
})
